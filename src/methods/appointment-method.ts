/** @format */

import { config, createDBConnection } from '@/db';
import { appointments } from '@/db/schema/appointments';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

export async function getAppointments() {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const appointment = await db.select().from(appointments);

		// close database connection
		conn.end();
		return appointment;
	} catch (error) {
		return [];
	}
}
