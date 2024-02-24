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

export type Content = {
	title: string;
	subTitle: string;
	navigate_link: {
		title: string;
		URL: string;
	};
	image: string;
};

// setup banner section
export async function addBanner() {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// setup base banner section
		await db.insert(page).values({
			section: 'banner',
			page: 'home',
			content: {
				title: '',
				subTitle: '',
				navigate_link: {
					title: '',
					URL: '',
				},
				image: '',
			},
		});

		// close database connection
		conn.end();
		revalidatePath('/dashboard/pages/home', 'page');
	} catch (error) {
		redirect('/errors');
	}
}

const BannerFormSchema = z.object({
	title: z.string({
		required_error: 'Banner title is required',
		invalid_type_error: 'Invalid banner title format',
	}),
	subTitle: z.string({
		required_error: 'Sub-Title is required',
		invalid_type_error: 'Invalid Sub-Title format',
	}),
	link: z.string({
		required_error: 'Banner navigation link is required',
		invalid_type_error: 'Invalid banner navigate link',
	}),
	image: z
		.string({
			required_error: 'Background is required',
			invalid_type_error: 'Invalid background image',
		})
		.optional(),
});

export type BannerFormState = {
	errors?: {
		title?: string[];
		subTitle?: string[];
		link?: string[];
		image?: string[];
	};
	status: number;
	message?: string;
};

// update banner
export async function updateBanner(
	id: number,
	prevState: BannerFormState | undefined,
	formData: FormData,
) {
	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// find banner
		const cur_banner = await db
			.select()
			.from(page)
			.where(and(eq(page.id, id)));

		if (cur_banner.length <= 0) {
			conn.end();
			return {
				status: 500,
				message: 'Internal server error',
			};
		}

		const cur_content = JSON.parse(String(cur_banner[0].content)) as Content;
		// check image
		const bgImage = formData.get('image') as File;
		if (bgImage.size > 0) {
			if (cur_content.image || cur_content.image !== '') {
				// delete old image
				const delete_res = await deleteFile(cur_content.image);
				if (!delete_res) {
					conn.end();
					return {
						status: 500,
						message: 'Problem with file delete',
					};
				}
			}
			// upload new image
			const imgPath = `/images/${v4()}${bgImage.name}`;

			const upload_res = await uploadFile(bgImage, imgPath, 20);
			if (upload_res === 'Big') {
				conn.end();
				return {
					errors: {
						image: ['Image size is too big, must be less than 20MB'],
					},
					status: 400,
				};
			} else if (upload_res === 'faild') {
				conn.end();
				return {
					status: 500,
					message: 'Problem with file upload',
				};
			}
			cur_content.image = imgPath;
		}

		// validate inputs
		const validatedFields = BannerFormSchema.safeParse({
			title: formData.get('title'),
			subTitle: formData.get('subtitle'),
			link: formData.get('navigate-link'),
			image: cur_content.image,
		});

		// check inputs error
		if (!validatedFields.success) {
			conn.end();
			return {
				errors: validatedFields.error.flatten().fieldErrors,
				status: 400,
			};
		}

		// parse input
		const { link, subTitle, title, image } = validatedFields.data;

		// construct new content
		const new_content: Content = {
			title: title,
			image: image!,
			navigate_link: JSON.parse(link),
			subTitle: subTitle,
		};

		// update banner
		await db
			.update(page)
			.set({
				content: new_content,
			})
			.where(eq(page.id, id));

		// close the database connection
		conn.end();
		revalidatePath('/dashboard/pages/home', 'page');
		return {
			status: 200,
			message: 'Banner Updated successfully',
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

// delete banner
export async function deleteBanner(id: number) {
	try {
		// connect to database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// find banner
		const cur_banner = await db.select().from(page).where(eq(page.id, id));

		if (cur_banner.length <= 0) {
			conn.end();
			redirect('/errors');
		} else {
			const cur_content = JSON.parse(String(cur_banner[0].content)) as Content;

			// is image exist delete image
			if (cur_content.image) {
				await deleteFile(cur_content.image);
			}

			// delete banner
			await db.delete(page).where(eq(page.id, id));
			conn.end();
			revalidatePath('/dashboard/pages/home', 'page');
		}
	} catch (error) {
		redirect('/errors');
	}
}
