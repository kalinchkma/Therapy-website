/** @format */

import { config, createDBConnection } from '@/db';
import { services } from '@/db/schema/services';
import mysql from 'mysql2/promise';

export async function getAllServices() {
	try {
		// conn database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		// perform operation
		const res = await db.select().from(services);
		// close database connection
		conn.end();
		// return all services
		return res;
	} catch (err) {
		return false;
	}
}
