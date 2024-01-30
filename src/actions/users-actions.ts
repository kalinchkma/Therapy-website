/** @format */
'use server';

import { config, createDBConnection } from '@/db';
import { users } from '@/db/schema/users';
import { UsersType } from '@/lib/definitions';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import mysql from 'mysql2/promise';
import { z } from 'zod';

export async function makeMember(id: number) {
	try {
		// create connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db
			.update(users)
			.set({ user_type: UsersType['team-member'] })
			.where(eq(users.id, id));
		// close connection
		conn.end();
		revalidatePath('/dashboard/users', 'page');
	} catch (error) {
		throw new Error('Internal server Error');
	}
}

export async function makeClient(id: number) {
	try {
		// create connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db
			.update(users)
			.set({ user_type: UsersType.client })
			.where(eq(users.id, id));
		// close connection
		conn.end();
		revalidatePath('/dashboard/users', 'page');
	} catch (error) {
		throw new Error('Internal server Error');
	}
}

export async function makeAdmin(id: number) {
	try {
		// create connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db
			.update(users)
			.set({ user_type: UsersType.admin })
			.where(eq(users.id, id));
		// close connection
		conn.end();
		revalidatePath('/dashboard/users', 'page');
	} catch (error) {
		throw new Error('Internal server Error');
	}
}
