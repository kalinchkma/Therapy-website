/** @format */

import { config, createDBConnection } from '@/db';
import { blog } from '@/db/schema/blogs';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { redirect } from 'next/navigation';

export async function getBlogs() {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const blogs = await db.select().from(blog);

		// close database connection
		conn.end();
		return blogs;
	} catch (error) {
		return [];
	}
}
