/** @format */

import { config, createDBConnection } from '@/db';
import { image_gellary } from '@/db/schema/image-gellary';

import mysql from 'mysql2/promise';

export async function getImageGellary() {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const gellary = await db.select().from(image_gellary);

		// close database connection
		conn.end();
		return gellary;
	} catch (error) {
		return [];
	}
}
