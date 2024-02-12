/** @format */

import { config, createDBConnection } from '@/db';
import { informations } from '@/db/schema/information';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { redirect } from 'next/navigation';

export async function getInformations() {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const information = await db.select().from(informations);

		// close database connection
		conn.end();
		return information;
	} catch (error) {
		redirect('/errors');
	}
}
