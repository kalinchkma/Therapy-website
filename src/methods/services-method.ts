/** @format */

import { config, createDBConnection } from '@/db';
import { services } from '@/db/schema/services';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

// get all services
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

// get all services
export async function getAllServicesPublic() {
	try {
		// conn database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		// perform operation
		const res = await db
			.select()
			.from(services)
			.where(eq(services.published, 1));
		// close database connection
		conn.end();
		// return all services
		return res;
	} catch (err) {
		return false;
	}
}

// get service by email
export async function getServiceById(id: number) {
	try {
		// conn database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		// perform operation
		const res = await db.select().from(services).where(eq(services.id, id));
		if (res.length <= 0) {
			conn.end();
			return false;
		}
		conn.end();
		return res;
	} catch (error) {
		return false;
	}
}
