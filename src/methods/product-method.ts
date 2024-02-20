/** @format */

import { config, createDBConnection } from '@/db';
import { product } from '@/db/schema/product';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { redirect } from 'next/navigation';

// fetch all product

export async function fetchAllProduct() {
	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		const all_product = await db.select().from(product);
		// close connection
		conn.end();
		return all_product;
	} catch (error) {
		return [];
	}
}
