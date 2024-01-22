/** @format */

'use server';

import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { hash_password, verify_password } from '@/lib/utils';
import { cookies } from 'next/headers';
import { create_auth_token, verify_auth_token } from '@/lib/utils';
import { AuthTokenData } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { AuthTokenName } from '@/lib/definitions';

// Signup Form Schema
const FromSchema = z.object({
	first_name: z
		.string({
			required_error: 'First name is required',
			invalid_type_error: 'First name must be a string',
		})
		.min(4, { message: 'Must be 4 or more characters long' }),
	last_name: z
		.string({
			invalid_type_error: 'Last name must be a string',
		})
		.min(2, { message: 'Must be 2 or more characters long' }),
	email: z
		.string({
			required_error: 'Email is required',
			invalid_type_error: 'Must be a email format',
		})
		.email({ message: 'Invalid email address' }),

	password: z
		.string({
			required_error: 'Password required',
			invalid_type_error: 'Password must be a string',
		})
		.min(6, { message: 'Password must be 5 or more characters long' }),
	confirmPassword: z
		.string({
			required_error: 'Confirm password required',
			invalid_type_error: 'Confirm password must be a string',
		})
		.min(6, { message: 'Password must be 5 or more charcters long' }),
});

// Signup Initial state
export type SignupState = {
	errors?: {
		first_name?: string[];
		last_name?: string[];
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
	};
	message?: string | null;
	errorMessage?: string | null;
};

// Signup function
export async function signup(prevState: SignupState, formData: FormData) {
	// Validate user inputs using `zod`
	const validatedFields = FromSchema.safeParse({
		first_name: formData.get('fname'),
		last_name: formData.get('lname'),
		email: formData.get('email'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirm-password'),
	});

	// If validation failed return error
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			errorMessage: 'Missing Fields. Failed to signup',
			message: '',
		};
	}
	// if success get data for new user
	const { first_name, last_name, email, password, confirmPassword } =
		validatedFields.data;
	// password and confirm password not match return error
	if (password !== confirmPassword) {
		return {
			errors: {
				password: ['Password dose not match'],
				confirmPassword: ['Password dose not match'],
			},
			message: '',
			errorMessage: '',
		};
	}

	// if everything is ok try insert new user to database
	try {
		// check user is already exsist
		const check_user = await (await db())
			.select()
			.from(users)
			.where(eq(users.email, email))
			.execute();

		// if user already exist return error
		if (check_user.length !== 0) {
			return {
				errors: {
					email: ['Email Already exists'],
				},
				message: '',
				errorMessage: '',
			};
		}
		// hash password for database
		const hash_pass = await hash_password(password);
		if (!hash_pass) {
			return {
				errors: {},
				message: '',
				errorMessage: 'Failed to signup. Internal Server Error',
			};
		}
		// inserting new user to database
		await (
			await db()
		)
			.insert(users)
			.values({
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: hash_pass,
			})
			.execute();

		// if new user is created on database send success message
		return {
			errors: {},
			errorMessage: '',
			message: 'Signup successfully',
		};
	} catch (error) {
		// if error creating new user on database return error
		return {
			errors: {},
			message: '',
			errorMessage: 'Failed to signup. Internal Server Error',
		};
	}
}

// login form schema
const LoginFormSchema = FromSchema.omit({
	first_name: true,
	last_name: true,
	confirmPassword: true,
});

// const login state
export type LoginState = string | undefined | Response;

// Login/Authentication users function
export async function login(prevState: LoginState, formData: FormData) {
	// verify user input
	const validateInputs = LoginFormSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	});
	// check user inpue valid or not
	if (!validateInputs.success) {
		return 'Invalid users credentials';
	}

	// parse user input
	const { email, password } = validateInputs.data;

	try {
		// Query user from database
		const user = await (await db())
			.select()
			.from(users)
			.where(eq(users.email, email));
		// check user exist or not
		if (user.length !== 0) {
			// if user exist verify user password
			const verify = await verify_password(password, user[0].password);
			if (verify) {
				// create auth token for app access
				const authData: AuthTokenData = {
					name: user[0].first_name + ' ' + user[0].last_name,
					email: user[0].email,
				};
				const token = await create_auth_token(authData);
				if (token) {
					cookies().set({
						name: AuthTokenName,
						value: token,
						httpOnly: true,
						secure: true,
						path: '/',
					});
					redirect('/dashboard');
				}
				return 'Somethings went wrong, Try again';
			}
		}
		return 'Invalid Email and password';
	} catch (error) {
		return 'Somethings went wrong, Try again';
	}
}
