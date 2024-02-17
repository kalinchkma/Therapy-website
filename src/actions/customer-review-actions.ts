/** @format */

'use server';

import { config, createDBConnection } from '@/db';
import mysql from 'mysql2/promise';

import { z } from 'zod';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { blog } from '@/db/schema/blogs';
import { v4 } from 'uuid';
import { uploadFile } from '@/lib/helper_function';
import { customer_review } from '@/db/schema/customer-review';

// form state
const FormSchema = z.object({
	video_url: z.string({
		required_error: 'video URL is required',
		invalid_type_error: 'Invalid video url format',
	}),
	thumbnail_image: z.string({
		required_error: 'Tumbnail Image is required',
		invalid_type_error: 'Invalid file formate',
	}),
});

export type FormState = {
	errors?: {
		video_url?: string[];
		thumbnail_image?: string[];
	};
	status: number;
	message?: string;
};

// add new customer review
export async function addNewCustomerReview(
	prevState: FormState | undefined,
	formData: FormData,
) {
	// check file exist
	const video_thumbnail = formData.get('video-thumbnail') as File;
	if (video_thumbnail.size <= 0) {
		return {
			status: 400,
			errors: {
				thumbnail_image: ['Invalid thumbnail image'],
			},
		};
	}

	// try upload image
	const image_path = `/images/${v4()}${video_thumbnail.name}`;

	const upload_res = await uploadFile(video_thumbnail, image_path, 10);

	if (upload_res === 'Big') {
		return {
			status: 400,
			errors: {
				thumbnail_image: ['Thumbnail Image is too large'],
			},
		};
	} else if (upload_res === 'faild') {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}

	// varify input
	const validateFields = FormSchema.safeParse({
		video_url: formData.get('video-url'),
		thumbnail_image: image_path,
	});

	// check error
	if (!validateFields.success) {
		return {
			errors: validateFields.error.flatten().fieldErrors,
			status: 400,
		};
	}

	// parse data
	const { thumbnail_image, video_url } = validateFields.data;

	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db.insert(customer_review).values({
			thumbnail_image: thumbnail_image,
			video_url: video_url,
		});

		// close database connetion
		conn.end();
		revalidatePath('/dashboard/customer-review', 'page');
		return {
			status: 200,
			message: 'Customer review added successfully',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}
