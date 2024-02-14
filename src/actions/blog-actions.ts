/** @format */

'use server';

import { config, createDBConnection } from '@/db';
import { blog } from '@/db/schema/blogs';
import { deleteFile, uploadFile } from '@/lib/helper_function';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

// form schema
const FormSchema = z.object({
	title: z.string({
		required_error: 'Blog title is required',
		invalid_type_error: 'Invalid blog title',
	}),
	summary: z.string({
		required_error: 'Blog summary is required',
		invalid_type_error: 'Invalid blog summary format',
	}),
	author: z.string({
		required_error: 'Blog author is required',
		invalid_type_error: 'Invalid blog author',
	}),
	keywords: z.string({
		required_error: 'Blog keywords is required',
		invalid_type_error: 'Invalid blog keywords',
	}),
	content: z.string({
		required_error: 'Blog content is required',
		invalid_type_error: 'Invalid blog content',
	}),
	thumbnailImage: z.string({
		invalid_type_error: 'Invalid thumbnail image',
	}),
});

// form state
export type FormState = {
	errors?: {
		title?: string[];
		summary?: string[];
		author?: string[];
		keywords?: string[];
		content?: string[];
		thumbnailImage?: string[];
	};
	status: number;
	message?: string;
};

// create new blog post
export async function createNewBlogPost(
	prevState: FormState | undefined,
	formData: FormData,
) {
	// check image is exist or not in the blog post
	const thumbnailImageFile = formData.get('blog-thumbnail') as File;
	if (thumbnailImageFile.size <= 0) {
		return {
			status: 400,
			error: {
				thumbnailImage: ['Please provide a thumbnailImage of a blog'],
			},
		};
	}

	// save the thumbnail image to disc
	const thumbnailImagePath = `/images/${uuidv4()}${thumbnailImageFile.name}`;
	const upload_thumbnail = await uploadFile(
		thumbnailImageFile,
		thumbnailImagePath,
		60,
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
			status: 500,
			message: 'Internal server error please try again',
		};
	}

	// validates text inputs
	const validatedFields = FormSchema.safeParse({
		title: formData.get('blog-title'),
		summary: formData.get('blog-abstract'),
		author: formData.get('blog-author'),
		keywords: formData.get('blog-keywords'),
		content: formData.get('blog-content'),
		thumbnailImage: thumbnailImagePath,
	});

	// check validation
	if (!validatedFields.success) {
		return {
			status: 400,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}
	// parse safe data
	const { author, content, keywords, summary, thumbnailImage, title } =
		validatedFields.data;

	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// perform database connection
		await db.insert(blog).values({
			title: title,
			author: author,
			summary: summary,
			content: content,
			thumbnailImage: thumbnailImage,
			keywords: keywords,
		});
		// close database connection
		conn.end();
		revalidatePath('/dashboard/blog-post', 'page');
		return {
			status: 200,
			message: 'New blog post has been created',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}
