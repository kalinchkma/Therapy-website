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

// client product fetch
export async function fetchAllProductClient(search: string = '') {
	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const all_product = await db.select().from(product);
		// close connection
		conn.end();

		if (!search) {
			let sorted = all_product.sort((a, b) => {
				return b.id - a.id;
			});

			return sorted;
		} else {
			const filter_blog = all_product.filter((product) => {
				return product.title?.toLowerCase().includes(search);
			});
			return filter_blog;
		}
	} catch (error) {
		return [];
	}
}
