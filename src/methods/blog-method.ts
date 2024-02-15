/** @format */

import { config, createDBConnection } from '@/db';
import { blog } from '@/db/schema/blogs';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { redirect } from 'next/navigation';

// fetch all blog post
export async function getBlogs(search: string = '') {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const blogs = await db.select().from(blog);

		// close database connection
		conn.end();
		if (!search) {
			const sorted = blogs.sort((a, b) => {
				return b.id - a.id;
			});
			return sorted;
		} else {
			const filter_blog = blogs.filter((blog) => {
				return blog.keywords?.toLowerCase().includes(search);
			});
			return filter_blog;
		}
	} catch (error) {
		return [];
	}
}
// fetch blogpost by id
export async function getBlogById(id: number) {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const blog_post = await db.select().from(blog).where(eq(blog.id, id));

		// close database connection
		conn.end();

		return blog_post[0];
	} catch (error) {
		redirect('/errors');
	}
}

// fetch blogpost by keyword
export async function getBlogByKeyword(keyword: string) {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const blogs = await db.select().from(blog);

		// close database connection
		conn.end();

		const filter_blog = blogs.filter((blog) => {
			return blog.keywords?.toLowerCase().includes(keyword);
		});
		return filter_blog;
	} catch (error) {
		return [];
	}
}
