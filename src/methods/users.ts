/** @format */

import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';
import { User } from '@/lib/definitions';

export async function getUserByEmail(email: string): Promise<User | undefined> {
	try {
		const user = await (await db())
			.select()
			.from(users)
			.where(eq(users.email, email));
		if (user.length !== 0) {
			return {
				name: user[0].first_name + ' ' + user[0].last_name,
				email: user[0].email,
				password: user[0].password,
				user_type: user[0].user_type,
			};
		}
	} catch (error) {
		throw new Error('Failed to Fectch user');
	}
}
