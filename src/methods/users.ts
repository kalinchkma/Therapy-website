/** @format */

import { db } from '@/db';
import { users } from '@/db/schema/users';
import { and, eq, ne, or } from 'drizzle-orm';
import { User, UsersType } from '@/lib/definitions';

export async function getUserByEmail(email: string): Promise<User | undefined> {
	try {
		const user = await (await db())
			.select()
			.from(users)
			.where(eq(users.email, email));
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
	try {
		const allUsers = await (
			await db()
		)
			.select()
			.from(users)
			.where(
				and(
					ne(users.user_type, UsersType.admin),
					ne(users.user_type, UsersType['super-admin']),
				),
			);
		if (allUsers.length !== 0) {
			return allUsers;
		}
	} catch (error) {
		throw new Error('Failed to Fect user');
	}
}
