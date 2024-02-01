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
import { v4 as uuidv4 } from 'uuid';
import { uploadFile, deleteFile } from '@/lib/helper_function';
import { notFound, redirect } from 'next/navigation';

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
		redirect('/errors');
	}
}

// make user as Team onboard @Only for admin
export async function makeTeamOnBoard(id: number) {
	try {
		// create connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db
			.update(users)
			.set({ user_type: UsersType['team-onboard'] })
			.where(eq(users.id, id));
		// close connection
		conn.end();
		revalidatePath('/dashboard/users', 'page');
	} catch (error) {
		redirect('/errors');
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
		redirect('/errors');
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
		redirect('/errors');
	}
}

// delete user
export async function deleteUser(id: number) {
	try {
		// create connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const user = await db.select().from(users).where(eq(users.id, id));

		// if user find delete user related file
		if (user.length > 0) {
			if (user[0].avatar !== 'None' || user[0].avatar !== null) {
				const res = await deleteFile(user[0].avatar!);
				if (!res) {
					// end database connection
					conn.end();
					notFound();
				}
			}
			await db.delete(users).where(eq(users.id, id));
			// close connection
			conn.end();
			revalidatePath('/dashboard/users', 'page');
		} else {
			// end database connection
			conn.end();
			notFound();
		}
	} catch (error) {
		redirect('/errors');
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
	designation: z.string({
		required_error: 'Designation is required',
		invalid_type_error: 'Designation must be a string',
	}),
	education: z.string({
		required_error: 'Education is required',
		invalid_type_error: 'Education must be a string',
	}),
	description: z.string({
		required_error: 'Description is required',
		invalid_type_error: 'Description must be a string',
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
		designation: formData.get('designation'),
		education: formData.get('education'),
		description: formData.get('description'),
	});

	// check data validation result
	if (!validatedFields.success) {
		return {
			error: true,
			message: 'Invalid user information, Please try again!',
		};
	}
	// if validation success extract data
	const {
		email,
		name,
		password,
		user_type,
		description,
		designation,
		education,
	} = validatedFields.data;

	const new_user = {
		name: name,
		email: email,
		password: password,
		user_type: user_type as UsersType,
		description: description,
		designation: designation,
		education: education,
		avatar: '',
	};
	// save file
	const avatar = formData.get('avatar') as File;
	if (avatar.size > 0) {
		const imagePath = `/images/${uuidv4()}${avatar.name}`;
		const uploadImage = await uploadFile(avatar, imagePath);
		if (uploadImage) {
			new_user['avatar'] = imagePath;
		} else {
			return {
				error: true,
				message: 'File upload error',
			};
		}
	}

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
			// end database connection
			conn.end();
			return {
				error: true,
				message: 'Internal Server error',
			};
		}

		new_user['password'] = hashPassword;

		// Create new user to database
		await db.insert(users).values(new_user).execute();

		// end database connection
		conn.end();

		revalidatePath('/dashboard/users', 'page');
		// return success message
		return {
			error: false,
			message: 'User created successfully',
		};
	} catch (error) {
		return {
			error: true,
			message: 'Internal server error',
		};
	}
}

// update avatar
export async function updateAvatar(
	id: number,
	path: string,
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		// save file
		const avatar = formData.get('avatar') as File;

		if (avatar.size > 0) {
			// create connection
			const conn = mysql.createPool(config);
			const db = createDBConnection(conn);

			const user = await db.select().from(users).where(eq(users.id, id));

			// if user find delete user related file
			if (user.length > 0) {
				if (user[0].avatar !== 'None') {
					const res = await deleteFile(user[0].avatar!);
					if (!res) {
						// end database connection
						conn.end();
						notFound();
					}
				}

				const imagePath = `/images/${uuidv4()}${avatar.name}`;
				const uploadImage = await uploadFile(avatar, imagePath);
				if (uploadImage) {
					const imageUrl = imagePath;
					await db
						.update(users)
						.set({ avatar: imageUrl })
						.where(eq(users.id, Number(id)));
					// close connection
					conn.end();

					revalidatePath(path, 'page');
					return 'success';
				} else {
					redirect('/errors');
				}
			} else {
				// end database connection
				conn.end();
				notFound();
			}
		}
	} catch (error) {
		redirect('/errors');
	}
}

// summary form schema
const SummaryFormSchema = z.object({
	summary: z.string({
		invalid_type_error: 'Summary must be a string',
	}),
});

// change user summary
export async function updateUserSummary(
	id: number,
	prevState:
		| {
				error?: { summary?: string; message?: string };
				success?: { message: string };
		  }
		| undefined,
	formData: FormData,
) {
	// validate input
	const validatedFields = SummaryFormSchema.safeParse({
		summary: formData.get('summary'),
	});

	if (!validatedFields.success) {
		return {
			error: {
				summary: 'Summary must be a string',
			},
		};
	}

	// extrac data
	const { summary } = validatedFields.data;

	try {
		// create connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// insert updated summary
		await db
			.update(users)
			.set({ description: summary })
			.where(eq(users.id, id));

		// end the database connection
		conn.end();
		revalidatePath('/dashboard/users', 'page');
		return {
			success: {
				message: 'Summary updated successfully',
			},
		};
	} catch (err) {
		return {
			error: {
				message: 'Internal server error',
			},
		};
	}
}

// summary form schema
const EducationFormSchema = z.object({
	education: z.string({
		invalid_type_error: 'Education must be a string',
	}),
});

// change user education
export async function updateUserEducation(
	id: number,
	path: string,
	prevState:
		| {
				error?: { education?: string; message?: string };
				success?: { message: string };
		  }
		| undefined,
	formData: FormData,
) {
	// validate input
	const validatedFields = EducationFormSchema.safeParse({
		education: formData.get('education'),
	});

	if (!validatedFields.success) {
		return {
			error: {
				education: 'Education must be a string',
			},
		};
	}

	// extrac data
	const { education } = validatedFields.data;

	try {
		// create connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// insert updated summary
		await db
			.update(users)
			.set({ education: education })
			.where(eq(users.id, id));

		// end the database connection
		conn.end();
		revalidatePath(path, 'page');
		return {
			success: {
				message: 'education updated successfully',
			},
		};
	} catch (err) {
		return {
			error: {
				message: 'Internal server error',
			},
		};
	}
}

// change user position schema
const ChangeUserPositionSchema = z.object({
	position: z.string({
		invalid_type_error: 'Invalid User position, must be a text format',
	}),
});

// change user position
export async function changeTeamMemberPosition(id: number, formData: FormData) {
	// validate user input
	const validatedFields = ChangeUserPositionSchema.safeParse({
		position: formData.get('position'),
	});

	// if input error return error
	if (!validatedFields.success) {
		redirect('/errors');
	}

	const { position } = validatedFields.data;

	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db
			.update(users)
			.set({ designation: position })
			.where(eq(users.id, id));
		// end connection
		conn.end();
		revalidatePath('/dashboard/users', 'page');
	} catch (err) {
		redirect('/errors');
	}
}
