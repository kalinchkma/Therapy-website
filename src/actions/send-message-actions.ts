/** @format */

'use server';

import { config, createDBConnection } from '@/db';
import mysql from 'mysql2/promise';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { product } from '@/db/schema/product';
import { v4 } from 'uuid';
import { deleteFile, uploadFile } from '@/lib/helper_function';
import { messages } from '@/db/schema/message';

const SendMessageFormSchema = z.object({
	name: z.string({
		required_error: 'Name is required',
		invalid_type_error: 'Invalid string format',
	}),
	subject: z.string({
		required_error: 'Subject is required',
		invalid_type_error: 'Invalid subject format',
	}),
	email: z.string({
		required_error: 'Email is required',
		invalid_type_error: 'Invalid email format',
	}),
	phone_number: z.string({
		required_error: 'Phone number is required',
		invalid_type_error: 'Invalid phone number format',
	}),
	message: z.string({
		required_error: 'Message is required',
		invalid_type_error: 'Invalid message format',
	}),
});

export type SendMessageFormState = {
	errors?: {
		name?: string[];
		subject?: string[];
		email?: string[];
		phone_number?: string[];
		message?: string[];
	};
	status: number;
	message?: string;
};

// send message actions
export async function sendMessage(
	prevState: SendMessageFormState | undefined,
	formData: FormData,
) {
	// validate form
	const validateFields = SendMessageFormSchema.safeParse({
		name: formData.get('name'),
		subject: formData.get('subject'),
		email: formData.get('email'),
		phone_number: formData.get('phone-number'),
		message: formData.get('message'),
	});

	// validate error
	if (!validateFields.success) {
		return {
			errors: validateFields.error.flatten().fieldErrors,
			status: 400,
		};
	}
	// parse input
	const { email, message, name, phone_number, subject } = validateFields.data;

	try {
		// connect to database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		await db.insert(messages).values({
			name: name,
			subject: subject,
			email: email,
			message: message,
			phone: phone_number,
		});
		// close connection
		conn.end();
		return {
			status: 200,
			message: 'Thanks for your message, We will contact with you',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}
