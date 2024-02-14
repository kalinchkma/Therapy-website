/** @format */

'use server';

import { config, createDBConnection } from '@/db';
import mysql from 'mysql2/promise';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { packages } from '@/db/schema/packages';

// form schema
const FormSchema = z.object({
	package_title: z.string({
		required_error: 'Package title is required',
		invalid_type_error: 'Invalid package title',
	}),
	package_description: z.string({
		required_error: 'Package description is required',
		invalid_type_error: 'Invalid package description',
	}),
	package_price: z.number({
		required_error: 'Price is required',
		invalid_type_error: 'Invalid package price',
	}),
	money_type: z.string({
		required_error: 'Package type is required',
		invalid_type_error: 'Invalid package type',
	}),
	package_offer: z.number({
		required_error: 'Package offers is required, if no offers just put 0',
		invalid_type_error: 'Invalid package offer',
	}),
	package_type: z.string({
		required_error: 'Package Type is required',
		invalid_type_error: 'Invalid package type',
	}),
	package_details: z.string({
		required_error: 'Package details is required',
		invalid_type_error: 'Invalid package detaisl',
	}),
});

// form state
export type FormState = {
	errors?: {
		package_title?: string[];
		package_description?: string[];
		package_price?: string[];
		money_type?: string[];
		package_offer?: string[];
		package_type?: string[];
		package_details?: string[];
	};
	status: number;
	message?: string;
};

// create new package
export async function createNewPackage(
	prevState: FormState | undefined,
	formData: FormData,
) {
	// validated fields
	const validatedFields = FormSchema.safeParse({
		package_title: formData.get('package-title'),
		package_description: formData.get('package-description'),
		package_price: Number(formData.get('package-price')),
		money_type: formData.get('money-type'),
		package_offer: Number(formData.get('package-offer')),
		package_type: formData.get('package-type'),
		package_details: formData.get('package-details'),
	});
	// check error input
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			status: 400,
		};
	}

	// parse user input
	const {
		money_type,
		package_description,
		package_details,
		package_offer,
		package_price,
		package_title,
		package_type,
	} = validatedFields.data;

	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// perform database connection
		await db.insert(packages).values({
			title: package_title,
			description: package_description,
			price: package_price,
			packageDetails: package_details,
			moneyType: money_type,
			package_type: package_type,
			offers: package_offer,
		});
		// close database connection
		conn.end();
		revalidatePath('/dashboard/manage-packages', 'page');
		return {
			status: 200,
			message: 'Package created successfully',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

// update package
export async function updatePackage(
	id: number,
	prevState: FormState | undefined,
	formData: FormData,
) {
	// validated fields
	const validatedFields = FormSchema.safeParse({
		package_title: formData.get('package-title'),
		package_description: formData.get('package-description'),
		package_price: Number(formData.get('package-price')),
		money_type: formData.get('money-type'),
		package_offer: Number(formData.get('package-offer')),
		package_type: formData.get('package-type'),
		package_details: formData.get('package-details'),
	});
	// check error input
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			status: 400,
		};
	}

	// parse user input
	const {
		money_type,
		package_description,
		package_details,
		package_offer,
		package_price,
		package_title,
		package_type,
	} = validatedFields.data;

	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// perform database connection
		await db
			.update(packages)
			.set({
				title: package_title,
				description: package_description,
				price: package_price,
				packageDetails: package_details,
				moneyType: money_type,
				package_type: package_type,
				offers: package_offer,
			})
			.where(eq(packages.id, id));
		// close database connection
		conn.end();
		revalidatePath('/dashboard/manage-packages', 'page');
		return {
			status: 200,
			message: 'Package has been updated successfully',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

// delete package
export async function deletePackage(id: number) {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		// perform database operation
		await db.delete(packages).where(eq(packages.id, id));
		// close database connection
		conn.end();
		revalidatePath('/dashboard/manage-packages', 'page');
	} catch (error) {
		redirect('/errors');
	}
}
