/** @format */

import { config, createDBConnection } from '@/db';

import { page } from '@/db/schema/page';
import { and, eq, or } from 'drizzle-orm';
import mysql from 'mysql2/promise';

// fetch home page banner
export async function fetchBanner() {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		// fetch database
		const banners = await db
			.select()
			.from(page)
			.where(and(eq(page.page, 'home'), eq(page.section, 'banner')));
		// close database connection
		conn.end();
		return banners.sort((a, b) => {
			return b.id - a.id;
		});
	} catch (error) {
		return [];
	}
}
