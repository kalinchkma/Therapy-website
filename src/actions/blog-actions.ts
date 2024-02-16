/** @format */

'use server';

import { config, createDBConnection } from '@/db';
import { blog } from '@/db/schema/blogs';
import { comments } from '@/db/schema/comments';
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

// create new blog post
export async function updateBlogPost(
	id: number,
	prevState: FormState | undefined,
	formData: FormData,
) {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const curr_blog = await db.select().from(blog).where(eq(blog.id, id));

		if (curr_blog.length <= 0) {
			conn.end();
			return {
				status: 500,
				message: 'Internal server error',
			};
		}

		// check image is exist or not in the blog post
		const thumbnailImageFile = formData.get('blog-thumbnail') as File;
		let thumbnailImagePath = curr_blog[0].thumbnailImage;
		if (thumbnailImageFile.size > 0) {
			// save the new thumbnail image to disc
			thumbnailImagePath = `/images/${uuidv4()}${thumbnailImageFile.name}`;
			const upload_thumbnail = await uploadFile(
				thumbnailImageFile,
				thumbnailImagePath,
				60,
			);

			// handler file upload error
			if (upload_thumbnail === 'Big') {
				conn.end();
				return {
					status: 400,
					error: {
						thumbnailImage: ['Image size is too big'],
					},
				};
			} else if (upload_thumbnail === 'faild') {
				conn.end();
				return {
					status: 500,
					message: 'Internal server error please try again',
				};
			}

			// if old image exist delete that
			if (curr_blog[0].thumbnailImage) {
				// delete the old thumbnail image
				const delete_res = await deleteFile(curr_blog[0].thumbnailImage);
				if (!delete_res) {
					// end database connection
					conn.end();
					return {
						status: 500,
						message: 'Internal server error',
					};
				}
			}
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

		// perform database connection
		await db
			.update(blog)
			.set({
				title: title,
				author: author,
				summary: summary,
				content: content,
				thumbnailImage: thumbnailImage,
				keywords: keywords,
			})
			.where(eq(blog.id, id));
		// close database connection
		conn.end();
		revalidatePath('/dashboard/blog-post', 'page');
		return {
			status: 200,
			message: 'Blog has been updated',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

// delete blog post
export async function deleteBlogPost(id: number) {
	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// find the blog post
		const cur_blog = await db.select().from(blog).where(eq(blog.id, id));

		if (cur_blog.length <= 0) {
			conn.end();
			redirect('/errors');
		} else {
			if (cur_blog[0].thumbnailImage) {
				// delete image of blog post
				const delete_res = await deleteFile(cur_blog[0].thumbnailImage);
				if (!delete_res) {
					// end database connection
					conn.end();
					redirect('/errors');
				}
			}
			// delete blog post
			await db.delete(blog).where(eq(blog.id, id));

			// delete blog post comment
			await db.delete(comments).where(eq(comments.blog_id, id));

			// close database connection
			conn.end();
			revalidatePath('/dashboard/blog-post', 'page');
		}
	} catch (error) {
		redirect('/errors');
	}
}

// make public and private of blog post
export async function publishBlogPost(id: number) {
	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// find the blog post
		const cur_blog = await db.select().from(blog).where(eq(blog.id, id));

		if (cur_blog.length <= 0) {
			conn.end();
			redirect('/errors');
		} else {
			// update blog post
			await db
				.update(blog)
				.set({
					published: !cur_blog[0].published,
				})
				.where(eq(blog.id, id));

			// close database connection
			conn.end();
			revalidatePath('/dashboard/blog-post', 'page');
		}
	} catch (error) {
		redirect('/errors');
	}
}
