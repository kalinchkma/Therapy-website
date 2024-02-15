/** @format */

import { config, createDBConnection } from '@/db';
import { blog } from '@/db/schema/blogs';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { redirect } from 'next/navigation';

export async function getBlogs(search: string = '') {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const blogs = await db.select().from(blog);

		// close database connection
		conn.end();
		if (!search) {
			return blogs;
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
