/** @format */

import { config, createDBConnection } from '@/db';
import { comments } from '@/db/schema/comments';
import { customer_review } from '@/db/schema/customer-review';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

// get all customer review
export async function getAllCustomerReview() {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// fetch all customer review
		const all_crv = await db.select().from(customer_review);

		// close database connection
		conn.end();
		return all_crv;
	} catch (error) {
		return [];
	}
}
