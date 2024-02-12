/** @format */

import { config, createDBConnection } from '@/db';
import { appointments } from '@/db/schema/appointments';
import { services } from '@/db/schema/services';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';

export async function getAppointments() {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const appointment = await db.select().from(appointments);
		const service = await db.select().from(services);
		const user = await db.select().from(users);
		const sorted_appointments = appointment.sort((a, b) => {
			return b.id - a.id;
		});
		const combine_appointments = sorted_appointments.map((data) => {
			return {
				...data,
				services: service,
				users: user,
			};
		});

		// close database connection
		conn.end();
		return combine_appointments;
	} catch (error) {
		return [];
	}
}
