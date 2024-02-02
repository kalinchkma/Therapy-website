/** @format */

'use server';
import { z } from 'zod';
import mysql from 'mysql2/promise';
import { config, createDBConnection } from '@/db/index';
import { services } from '@/db/schema/services';
import { uploadFile } from '@/lib/helper_function';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

const CreateServiceSchema = z.object({
	name: z
		.string({
			invalid_type_error: 'Invalid name new must be a text',
		})
		.min(4, {
			message:
				'Service name is too short! service name must be 4 or more character',
		}),
	description: z
		.string({
			invalid_type_error: 'Invalid description, description must be a text',
		})
		.min(100, { message: 'Minimum character is 100 or more' }),
	price: z
		.string({
			invalid_type_error: 'Price must be a string',
		})
		.optional(),
	thumbnailImage: z.string({
		invalid_type_error: 'File name error',
	}),
});

export type FromState = {
	error?: {
		name?: string[];
		description?: string[];
		price?: string[];
		thumbnailImage?: string[];
	};
	message?: string;
	status: number;
};

// create new service
export async function createNewService(
	prevState: FromState,
	formData: FormData,
) {
	// validate file input
	const thumbnailImageFile = formData.get('thumbnail') as File;
	if (thumbnailImageFile.size <= 0) {
		return {
			status: 400,
			error: {
				thumbnailImage: ['Please provide a thumbnailImage of a service'],
			},
		};
	}

	// save the thumbnail image to disc
	const thumbnailImagePath = `/images/${uuidv4()}${thumbnailImageFile.name}`;
	const upload_thumbnail = await uploadFile(
		thumbnailImageFile,
		thumbnailImagePath,
		50,
	);

	// handler file upload error
	if (upload_thumbnail === 'Big') {
		return {
			status: 400,
			error: {
				thumbnailImage: ['Image size is too big'],
			},
		};
	} else if (upload_thumbnail === 'faild') {
		return {
			status: 400,
			message: 'Internal server error please try again',
		};
	}

	// validate text input
	const validatedFields = CreateServiceSchema.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
		price: formData.get('price'),
		thumbnailImage: thumbnailImagePath,
	});

	// if not validate input
	if (!validatedFields.success) {
		return {
			status: 400,
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { description, name, thumbnailImage, price } = validatedFields.data;

	try {
		// connect to database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// perform database connection
		await db.insert(services).values({
			name: name,
			thumbnailImage: thumbnailImage,
			description: description,
			price: price,
			published: false,
		});

		// close the connection of database
		conn.end();

		// revalidate service page
		revalidatePath('/dashboard/services', 'page');

		return {
			status: 200,
			message: 'Service created successfully',
		};
	} catch (err) {
		return {
			status: 400,
			message: 'Internal service error. Try again',
		};
	}
}

// update service thumbnail image
