/** @format */

'use server';

import { comments } from '@/db/schema/comments';
import { config, createDBConnection } from '@/db';
import mysql from 'mysql2/promise';

import { sendMail } from '@/mail';
import { z } from 'zod';
import { informations } from '@/db/schema/information';
import { services } from '@/db/schema/services';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { blog } from '@/db/schema/blogs';

const FormSchema = z.object({
	comment: z
		.string({
			required_error: 'Message is required',
			invalid_type_error: 'Invalid message format',
		})
		.max(1000, { message: 'Comment is too long' }),
	name: z.string({
		required_error: 'Name is required',
		invalid_type_error: 'Invalid name format',
	}),
	email: z.string({
		required_error: 'Email is required',
		invalid_type_error: 'Invalid email format',
	}),
});

export type FormState = {
	errors?: {
		comment?: string[];
		name?: string[];
		email?: string[];
	};
	status: number;
	message?: string;
};

// post comments
export async function postComments(
	blog_id: number,
	prevState: FormState | undefined,
	formData: FormData,
) {
	// validate input
	const validateFields = FormSchema.safeParse({
		comment: formData.get('comment'),
		name: formData.get('name'),
		email: formData.get('email'),
	});
	// validated error
	if (!validateFields.success) {
		return {
			errors: validateFields.error.flatten().fieldErrors,
			status: 200,
		};
	}
	// parse input
	const { comment, email, name } = validateFields.data;
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// find blog post
		const blog_post = await db.select().from(blog).where(eq(blog.id, blog_id));

		if (blog_post.length <= 0) {
			conn.end();
			return {
				status: 500,
				message: 'Server busy, plase try again',
			};
		}

		// update blog_post comment
		await db
			.update(blog)
			.set({
				comment: blog_post[0].comment! + 1,
			})
			.where(eq(blog.id, blog_id));

		// store the comment to database
		await db.insert(comments).values({
			blog_id: blog_id,
			comment_content: comment,
			email: email,
			name: name,
		});

		// close database connection
		conn.end();
		revalidatePath('/blog', 'page');
		return {
			status: 200,
			message: 'Thanks for your comments',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

// delete comments
export async function deleteComment(id: number) {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// find comment
		const comment = await db.select().from(comments).where(eq(comments.id, id));

		if (comment.length <= 0) {
			conn.end();
			redirect('/errors');
		} else {
			// find blog
			const blog_post = await db
				.select()
				.from(blog)
				.where(eq(blog.id, comment[0].blog_id));

			if (blog_post.length <= 0) {
				redirect('/errors');
			} else {
				// delete comment
				await db.delete(comments).where(eq(comments.id, id));

				await db.update(blog).set({
					comment: blog_post[0].comment! - 1,
				});
				// close database connection
				conn.end();
				revalidatePath('/dashboard/blog-post', 'page');
			}
		}
	} catch (error) {
		redirect('/errors');
	}
}
