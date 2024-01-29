/** @format */

import { db, connection } from '@/db';
import { users } from '@/db/schema/users';
import { and, eq, ne, or } from 'drizzle-orm';
import { User, UsersType } from '@/lib/definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUserByEmail(email: string): Promise<User | undefined> {
	noStore();
	try {
		const user = await (
			await db()
		)
			.select()
			.from(users)
			.where(eq(users.email, email))
			.finally(async () => {
				(await connection()).end();
			}); // close the connection
		if (user.length !== 0) {
			return {
				name: user[0].name,
				email: user[0].email,
				password: user[0].password,
				user_type: user[0].user_type,
			};
		}
	} catch (error) {
		throw new Error('Failed to Fectch user');
	}
}

// get user except admin
export async function getAllUsersExceptAdmin(): Promise<User[] | undefined> {
	noStore();
	try {
		const allUsers = await (
			await db()
		)
			.select()
			.from(users)
			.where(and(ne(users.user_type, UsersType.admin)))
			.finally(async () => {
				(await connection()).end();
			}); // close the connection

		if (allUsers.length !== 0) {
			return allUsers;
		}
	} catch (error) {
		throw new Error('Failed to Fect user');
	}
}
