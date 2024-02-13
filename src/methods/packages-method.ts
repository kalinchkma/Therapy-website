/** @format */

import { config, createDBConnection } from '@/db';
import { packages } from '@/db/schema/packages';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

export async function getPackages() {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const allPackages = await db.select().from(packages);

		// close database connection
		conn.end();
		return allPackages;
	} catch (error) {
		return [];
	}
}
