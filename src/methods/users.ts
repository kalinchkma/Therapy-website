/** @format */

import { db, connection, config, createDBConnection } from '@/db';
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
		conn.end();
		if (user.length !== 0) {
			return {
				name: user[0].name,
				email: user[0].email,
				password: user[0].password,
				user_type: user[0].user_type,
			};
		}

		return undefined;
	} catch (error) {
		console.log(error);
		throw new Error('Failed to Fectch user');
	}
}

// get user except admin
export async function getAllUsersExceptAdmin(): Promise<User[] | undefined> {
	noStore();
	try {
		const conn = mysql.createPool(config);

		const dbConn = createDBConnection(conn);

		const allUsers = await dbConn
			.select()
			.from(users)
			.where(and(ne(users.user_type, UsersType.admin)));
		conn.end();
		if (allUsers.length !== 0) {
			return allUsers;
		}
		return [];
	} catch (error) {
		throw new Error('Failed to Fect user');
	}
}
