/** @format */
'use server';

import { connection, db } from '@/db';
import { users } from '@/db/schema/users';
import { UsersType } from '@/lib/definitions';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function makeMember(id: number) {
	try {
		await db
			.update(users)
			.set({ user_type: UsersType['team-member'] })
			.where(eq(users.id, id));

		revalidatePath('/dashboard/users', 'page');
	} catch (error) {
		throw new Error('Internal server Error');
	}
}

export async function makeClient(id: number) {
	try {
		await db
			.update(users)
			.set({ user_type: UsersType.client })
			.where(eq(users.id, id));

		revalidatePath('/dashboard/users', 'page');
	} catch (error) {
		throw new Error('Internal server Error');
	}
}

export async function makeAdmin(id: number) {
	try {
		await db
			.update(users)
			.set({ user_type: UsersType.admin })
			.where(eq(users.id, id));

		revalidatePath('/dashboard/users', 'page');
	} catch (error) {
		throw new Error('Internal server Error');
	}
}
