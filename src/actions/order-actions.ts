/** @format */

'use server';

import { config, createDBConnection } from '@/db';
import { blog } from '@/db/schema/blogs';
import { comments } from '@/db/schema/comments';
import { informations } from '@/db/schema/information';
import { order } from '@/db/schema/order';
import { page } from '@/db/schema/page';

import { and, eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { z } from 'zod';

const OrderFormSchema = z.object({
	name: z.string({
		required_error: 'Name is required',
		invalid_type_error: 'Invalid name format',
	}),
	phone_number: z.string({
		required_error: 'Phone number is required',
		invalid_type_error: 'Invalid phone number',
	}),
	email: z.string({
		required_error: 'Email is required',
		invalid_type_error: 'Invalid email format',
	}),
	address: z.string({
		required_error: 'Address is required',
		invalid_type_error: 'Invalid address format',
	}),
	region: z.string({
		required_error: 'region is required',
		invalid_type_error: 'Invalid region',
	}),
	total_price: z.number({
		invalid_type_error: 'Price is invalid',
	}),
	total_items: z.number({
		invalid_type_error: 'Error in items',
	}),
	items: z.string({
		invalid_type_error: 'Invalid items',
	}),
});

export type OrderFormState = {
	errors?: {
		name?: string[];
		phone_number?: string[];
		email?: string[];
		address?: string[];
		region?: string[];
		total_price?: string[];
		total_items?: string[];
		items?: string[];
	};
	status: number;
	message?: string;
	total_cost?: number;
};

// place order
export async function placeOrder(
	prevState: OrderFormState | undefined,
	formData: FormData,
) {
	// validate inputs
	const validateFields = OrderFormSchema.safeParse({
		name: formData.get('name'),
		phone_number: formData.get('phone-number'),
		email: formData.get('email'),
		address: formData.get('address'),
		region: formData.get('region'),
		total_price: Number(formData.get('total-price')),
		total_items: Number(formData.get('total-items')),
		items: formData.get('items'),
	});

	if (!validateFields.success) {
		return {
			errors: validateFields.error.flatten().fieldErrors,
			status: 400,
		};
	}
	// input parse
	const {
		address,
		email,
		name,
		phone_number,
		region,
		items,
		total_items,
		total_price,
	} = validateFields.data;

	try {
		// create connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const info = await db.select().from(informations);

		if (info.length <= 0) {
			conn.end();
			return {
				status: 500,
				message: 'Internal server error',
			};
		}

		const cost = JSON.parse(String(info[0].product_shipping_charge)) as {
			dhaka: number;
			outside_dhaka: number;
		};

		let price_with_shipping = total_price;
		if (region === 'dhaka') {
			price_with_shipping += cost.dhaka;
		} else {
			price_with_shipping += cost.outside_dhaka;
		}

		await db.insert(order).values({
			name: name,
			address: address,
			phone_number: phone_number,
			region: region,
			email: email,
			total_price: price_with_shipping,
			items_list: JSON.parse(String(items)),
			total_items: total_items,
		});

		// close database connection
		conn.end();
		return {
			status: 200,
			message: `Your order placed successful. we will contact to you later`,
			total_cost: price_with_shipping,
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

// delete order
export async function deleteOrder(id: number) {
	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db.delete(order).where(eq(order.id, id));

		// close db connection
		conn.end();
		revalidatePath('/dashboard/ordered', 'page');
	} catch (error) {
		redirect('/errors');
	}
}
