/** @format */

'use server';

import { config, createDBConnection } from '@/db';
import { page } from '@/db/schema/page';
import { deleteFile, uploadFile } from '@/lib/helper_function';
import { and, eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 } from 'uuid';
import { z } from 'zod';

export type Banner = {
	title?: string;
	subTitle?: string;
	bgImage?: string;
};

const UpdateAboutSchema = z.object({
	content: z.string({
		invalid_type_error: 'Content must be a string',
	}),
});

export type AboutWriteState = {
	errors?: {
		content?: string[];
	};
	message?: string;
	status: number;
};

// setup banner section
export async function updateAbout(
	prevState: AboutWriteState,
	formData: FormData,
) {
	// validate inputs
	const validateFields = UpdateAboutSchema.safeParse({
		content: formData.get('content'),
	});

	if (!validateFields.success) {
		return {
			errors: validateFields.error.flatten().fieldErrors,
			status: 400,
		};
	}

	// pasrse content
	const { content } = validateFields.data;
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// check about alread exist
		const about = await db
			.select()
			.from(page)
			.where(and(eq(page.page, 'about'), eq(page.section, 'about')));

		if (about.length > 0) {
			await db
				.update(page)
				.set({
					content: {
						text: content,
					},
				})
				.where(and(eq(page.page, 'about'), eq(page.section, 'about')));
		} else {
			await db.insert(page).values({
				page: 'about',
				section: 'about',
				content: {
					text: content,
				},
			});
		}

		// close database connection
		conn.end();
		revalidatePath('/dashboard/pages/about', 'page');
		return {
			status: 200,
			message: 'About us successfully updated',
		};
	} catch (error) {
		return {
			status: 500,
			messsage: 'Internal server error',
		};
	}
}

// setup banner section
export async function setupBanner(pageName: string) {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// setup base banner section
		await db.insert(page).values({
			section: 'banner',
			page: pageName,
			content: {
				title: '',
				subTitle: '',
				bgImage: '',
			},
		});

		// close database connection
		conn.end();
		revalidatePath('/dashboard/pages/home', 'page');
	} catch (error) {
		redirect('/errors');
	}
}

// update banner state
const UpdateBannerSchema = z.object({
	title: z.string({
		invalid_type_error: 'Invalid banner title',
	}),
	subTitle: z.string({
		invalid_type_error: 'Invalid sub-titler',
	}),
	bgImage: z.string({
		invalid_type_error: 'Invaild image',
	}),
});

export type BannerUpdateState = {
	errors?: {
		title?: string[];
		subTitle?: string[];
		bgImage?: string[];
	};
	status: number;
	message?: string;
};

// page banner update
export async function pageBannerUpdate(
	id: number,
	pageName: string,
	prevState: BannerUpdateState | undefined,
	formData: FormData,
) {
	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// find the banner
		const banner = await db
			.select()
			.from(page)
			.where(
				and(
					eq(page.page, pageName),
					eq(page.section, 'banner'),
					eq(page.id, id),
				),
			);
		if (banner.length <= 0) {
			conn.end();
			return {
				status: 500,
				message: 'Server Error',
			};
		}
		// take old image path
		let image_path = (JSON.parse(String(banner[0].content)) as Banner).bgImage;
		let temp_path: string = '';
		const old_image = `${image_path}`;
		// check new image pass or not
		const new_image = formData.get('bg-image') as File;
		if (new_image.size > 0) {
			temp_path = `/images/${v4()}${new_image.name}`;
			// try upload image
			const upload_res = await uploadFile(new_image, temp_path, 50);
			if (upload_res === 'Big') {
				conn.end();
				return {
					status: 400,
					errors: {
						bgImage: ['Image is too big'],
					},
				};
			} else if (upload_res === 'faild') {
				conn.end();
				return {
					status: 500,
					message: 'falid to upload image',
				};
			} else {
				image_path = temp_path;
			}
		}
		// validate inputs
		const validateFields = UpdateBannerSchema.safeParse({
			title: formData.get('title'),
			subTitle: formData.get('sub-title'),
			bgImage: image_path,
		});

		// check input ok
		if (!validateFields.success) {
			conn.end();
			await deleteFile(temp_path);
			return {
				errors: validateFields.error.flatten().fieldErrors,
				status: 400,
			};
		}

		// parse inputs
		const { bgImage, subTitle, title } = validateFields.data;

		// clear new content object
		const c: Banner = {
			title: title,
			subTitle: subTitle,
			bgImage: bgImage,
		};

		// upload done try insert data into db
		await db
			.update(page)
			.set({
				content: c,
			})
			.where(
				and(
					eq(page.page, pageName),
					eq(page.section, 'banner'),
					eq(page.id, id),
				),
			);
		// delete old image
		await deleteFile(old_image);
		conn.end();
		revalidatePath('/dashboard/pages', 'page');
		return {
			status: 200,
			message: 'Banner conent updated',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}
