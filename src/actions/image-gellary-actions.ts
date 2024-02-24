/** @format */

'use server';

import { config, createDBConnection } from '@/db';
import { image_gellary } from '@/db/schema/image-gellary';
import { deleteFile, uploadFile } from '@/lib/helper_function';
import { and, eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 } from 'uuid';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// upload gellary image
export async function uploadGellaryImage(
	prevState: { status: number; message: string } | undefined,
	formData: FormData,
) {
	const image = formData.get('image') as File;

	if (image.size <= 0) {
		return { status: 400, message: 'Please Select image' };
	}

	const image_path = `/images/${v4()}${image.name}`;
	const upload_res = await uploadFile(image, image_path, 80);
	if (upload_res === 'Big') {
		return { status: 400, message: 'Image is too Big' };
	} else if (upload_res === 'faild') {
		return { status: 500, message: 'Failed to upload image' };
	}
	try {
		// connect to database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		// inset image info to database
		await db.insert(image_gellary).values({
			image_path: image_path,
			image_url: `${process.env.HOST}/${image_path}`,
		});
		// close connection
		conn.end();
		revalidatePath('/dashboard/image-gellary', 'page');
		return { status: 200, message: 'Image uploaded successfully' };
	} catch (error) {
		await deleteFile(image_path);
		return { status: 200, message: 'Internal server error' };
	}
}

// delete image
export async function deleteGellaryImage(id: number) {
	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// find the image
		const image = await db
			.select()
			.from(image_gellary)
			.where(eq(image_gellary.id, id));
		if (image.length < 0) {
			conn.end();
			redirect('/errors');
		} else {
			const delete_res = deleteFile(image[0].image_path);
			if (!delete_res) {
				conn.end();
				redirect('/errors');
			} else {
				await db.delete(image_gellary).where(eq(image_gellary.id, id));
				// close database connection
				conn.end();
				revalidatePath('/dashboard/image-gellary', 'page');
			}
		}
	} catch (error) {
		redirect('/errors');
	}
}
