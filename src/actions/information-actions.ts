/** @format */

'use server';

import { config, createDBConnection } from '@/db';
import { informations } from '@/db/schema/information';
import { uploadFile } from '@/lib/helper_function';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuid4 } from 'uuid';
import { z } from 'zod';

// setup website information
export async function setupWebInformation() {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		await db.insert(informations).values({
			openning_hours: {},
			contact_numbers: '',
			emails: '',
			location: '',
			logo: '',
			social_links: {},
			website_name: '',
		});
		// close database connection
		conn.end();
		// return
		revalidatePath('/dashboard/manage-information', 'page');
	} catch (error) {
		redirect('/errors');
	}
}

// update website logo
export async function updateWebsiteLogo(
	id: number,
	prevState: string | undefined,
	formData: FormData,
) {
	// check file exist
	const logo = formData.get('logo') as File;

	if (logo.size <= 0) {
		return 'Please attech a Image of a logo';
	}
	const filePath = `/images/${uuid4()}${logo.name}`;
	const upload_res = await uploadFile(logo, filePath, 10);
	if (upload_res === 'Big') {
		return 'File is too large, file must be a less than or equal 10MB';
	} else if (upload_res === 'faild') {
		return 'Internal server error';
	} else {
		try {
			// connect to database
			const conn = mysql.createPool(config);
			const db = createDBConnection(conn);
			await db
				.update(informations)
				.set({
					logo: filePath,
				})
				.where(eq(informations.id, id));
			// close connection
			conn.end();
			revalidatePath('/dashboard/manage-information', 'page');
		} catch (error) {
			return 'Internal server error';
		}
	}
}

const NameFormSchema = z.object({
	website_name: z.string({
		invalid_type_error: 'Name must be a text',
	}),
});

// update website name
export async function updateWebsiteName(
	id: number,
	prevState: string | undefined,
	formData: FormData,
) {
	// validate user input
	const validateFields = NameFormSchema.safeParse({
		website_name: formData.get('website-name'),
	});
	// validate success
	if (!validateFields.success) {
		return 'Name must ne a text';
	}

	// parse data
	const { website_name } = validateFields.data;

	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		await db
			.update(informations)
			.set({
				website_name: website_name,
			})
			.where(eq(informations.id, id));
		// close connection
		conn.end();
		revalidatePath('/dashboard/manage-information', 'page');
	} catch (error) {
		return 'Internal server error';
	}
}

const LocationFormSchema = z.object({
	location: z.string({
		invalid_type_error: 'Location must be a text format',
	}),
});

// update location
export async function updateLocation(
	id: number,
	prevState: string | undefined,
	formData: FormData,
) {
	// validate input
	const validateFields = LocationFormSchema.safeParse({
		location: formData.get('location'),
	});

	// validate error
	if (!validateFields.success) {
		return 'Location must be a text format';
	}
	const { location } = validateFields.data;
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		await db
			.update(informations)
			.set({
				location: location,
			})
			.where(eq(informations.id, id));
		// close database connection
		conn.end();
		revalidatePath('/dashboard/manage-information', 'page');
	} catch (error) {
		return 'Internal server error';
	}
}
