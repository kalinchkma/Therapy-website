/** @format */

import { config, createDBConnection } from '@/db';
import { messages } from '@/db/schema/message';

import mysql from 'mysql2/promise';

export async function getMessages() {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const M = await db.select().from(messages);

		// close database connection
		conn.end();
		return M;
	} catch (error) {
		return [];
	}
}
