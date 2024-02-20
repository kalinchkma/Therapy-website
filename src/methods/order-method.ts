/** @format */

import { config, createDBConnection } from '@/db';
import { order } from '@/db/schema/order';

import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { redirect } from 'next/navigation';

// get all order
export async function getAllOrder() {
	try {
		// connect to database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const all_order = await db.select().from(order);
		// close connection
		conn.end();
		return all_order;
	} catch (error) {
		return [];
	}
}
