/** @format */

import { config, createDBConnection } from '@/db';
import { comments } from '@/db/schema/comments';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

// find comments by id
export async function getCommentsByPostId(post_id: number) {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		const all_comments = await db
			.select()
			.from(comments)
			.where(eq(comments.blog_id, post_id));
		// close connection
		conn.end();
		return all_comments;
	} catch (error) {
		return [];
	}
}
