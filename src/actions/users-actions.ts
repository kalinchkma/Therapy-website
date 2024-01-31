/** @format */
'use server';

import { config, createDBConnection } from '@/db';
import { users } from '@/db/schema/users';
import { UsersType } from '@/lib/definitions';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import mysql from 'mysql2/promise';
import { z } from 'zod';
import { hash_password } from '@/lib/utils';

// make user as Team Member @Only for admin user access
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

// make user as client @Only for admin user access
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

// make user as admin @Only for admin user access
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

// create new user form schema

const FromSchema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
			invalid_type_error: 'Name must be a string',
		})
		.min(2, { message: 'Name must be 2 or more characters long' }),
	email: z
		.string({
			required_error: 'Email is required',
			invalid_type_error: 'Email must be a email string',
		})
		.email({ message: 'Invlid email address' }),
	password: z
		.string({
			required_error: 'Password is required',
			invalid_type_error: 'Password must be a string format',
		})
		.min(6, { message: 'Password must be 6 or more character long' }),
	user_type: z.string({
		required_error: 'User type is required',
		invalid_type_error: 'User type must be a string format',
	}),
});

export type UserCreateState = {
	error?: boolean;
	message: string;
};

// create new user
export async function createNewUser(
	prevState: UserCreateState | undefined,
	formData: FormData,
) {
	// validate user input
	const validatedFields = FromSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
		user_type: formData.get('user-type'),
	});

	// check data validation result
	if (!validatedFields.success) {
		return {
			error: true,
			message: 'Invalid user information, Please try again!',
		};
	}
	// if validation success extract data
	const { email, name, password, user_type } = validatedFields.data;

	// If everything is ok try creating new user
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// check the user exist on our database based on email
		const check_user = await db
			.select()
			.from(users)
			.where(eq(users.email, email));

		if (check_user.length !== 0) {
			// close the database connection
			conn.end();
			// return user already exist error
			return {
				error: true,
				message: 'User Email already exist',
			};
		}

		// hash password
		const hashPassword = await hash_password(password);

		if (!hashPassword) {
			return {
				error: true,
				message: 'Internal Server error',
			};
		}

		// Create new user to database
		await db
			.insert(users)
			.values({
				name: name,
				email: email,
				password: hashPassword,
				user_type: user_type as UsersType,
			})
			.execute();

		// end database connection
		conn.end();

		revalidatePath('/dashboard/users', 'page');
		// return success message
		return {
			error: false,
			message: 'User created successfully',
		};
	} catch (error) {
		throw new Error('Internal Server Error');
	}
}

// delete user
export async function deleteUser(id: number) {
	try {
		// create connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db.delete(users).where(eq(users.id, id));
		// close connection
		conn.end();
		revalidatePath('/dashboard/users', 'page');
	} catch (error) {
		throw new Error('Internal server Error');
	}
}
