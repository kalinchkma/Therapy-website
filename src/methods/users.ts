/** @format */

import { config, createDBConnection } from '@/db';
import mysql from 'mysql2/promise';
import { users } from '@/db/schema/users';
import { and, eq, ne, or } from 'drizzle-orm';
import { User, UsersType } from '@/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUserByEmail(email: string): Promise<User | undefined> {
	noStore();
	try {
		const conn = mysql.createPool(config);

		const dbConn = createDBConnection(conn);
		const user = await dbConn
			.select()
			.from(users)
			.where(eq(users.email, email));
		// close connection
		conn.end();
		if (user.length !== 0) {
			return {
				id: user[0].id,
				name: user[0].name,
				email: user[0].email,
				password: user[0].password,
				user_type: user[0].user_type,
				description: user[0].description!,
				designation: user[0].designation!,
				education: user[0].education!,
				avatar: user[0].avatar!,
			};
		}

		return undefined;
	} catch (error) {
		return undefined;
	}
}

// get user except admin
export async function getAllUsers(): Promise<User[] | undefined> {
	noStore();
	try {
		const conn = mysql.createPool(config);

		const dbConn = createDBConnection(conn);

		const allUsers = await dbConn.select().from(users);

		// close connection
		conn.end();
		if (allUsers.length !== 0) {
			return allUsers;
		}
		return [];
	} catch (error) {
		return undefined;
	}
}
