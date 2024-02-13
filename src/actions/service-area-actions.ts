/** @format */

'use server';
import { config, createDBConnection } from '@/db';
import { service_area } from '@/db/schema/service_areas';
import { deleteFile, uploadFile } from '@/lib/helper_function';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// service area formschema
const FormSchema = z.object({
	service_area_name: z.string({
		invalid_type_error: 'Invalid service area format',
	}),
	service_area_list: z.string({
		invalid_type_error: 'Invalid service area list format',
	}),
});

export type FormState = {
	errors?: {
		service_area_name?: string[];
		service_area_list?: string[];
	};
	status: number;
	message?: string;
};

export async function createServiceArea(
	prevState: FormState,
	formData: FormData,
) {
	// validate input
	const validatedFields = FormSchema.safeParse({
		service_area_name: formData.get('service-area-name'),
		service_area_list: formData.get('service-area-list'),
	});

	// validate input
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			status: 400,
		};
	}
	// parse input
	const { service_area_list, service_area_name } = validatedFields.data;

	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db.insert(service_area).values({
			service_area_name: service_area_name,
			service_area_list: JSON.parse(String(service_area_list)),
		});

		// close database connection
		conn.end();
		revalidatePath('/dashboard/services-area', 'page');
		return {
			status: 200,
			message: 'Service area created successfully',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

export async function updateServiceArea(
	id: number,
	prevState: FormState,
	formData: FormData,
) {
	// validate input
	const validatedFields = FormSchema.safeParse({
		service_area_name: formData.get('service-area-name'),
		service_area_list: formData.get('service-area-list'),
	});

	// validate input
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			status: 400,
		};
	}
	// parse input
	const { service_area_list, service_area_name } = validatedFields.data;

	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db
			.update(service_area)
			.set({
				service_area_name: service_area_name,
				service_area_list: JSON.parse(String(service_area_list)),
			})
			.where(eq(service_area.id, id));

		// close database connection
		conn.end();
		revalidatePath('/dashboard/services-area', 'page');
		return {
			status: 200,
			message: 'Service area Updated successfully',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}
