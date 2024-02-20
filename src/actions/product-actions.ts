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

const ProductFormSchema = z.object({
	product_title: z.string({
		required_error: 'Product title is required',
		invalid_type_error: 'Invalid product name',
	}),
	product_image: z.string({
		required_error: 'Product Image is required',
		invalid_type_error: 'Invalid product image',
	}),
	product_price: z.number({
		required_error: 'Product Price is required',
		invalid_type_error: 'Invalid Product price',
	}),
	product_description: z
		.string({
			invalid_type_error: 'Product description is required',
		})
		.optional(),
});

export type ProductFormState = {
	errors?: {
		product_title?: string[];
		product_image?: string[];
		product_price?: string[];
		product_description?: string[];
	};
	status: number;
	message?: string;
};

// add new product
export async function addNewProduct(
	prevState: ProductFormState | undefined,
	formData: FormData,
) {
	// validate image input
	const image = formData.get('product-image') as File;

	// check image attacted or not
	if (image.size <= 0) {
		return {
			errors: {
				product_image: ['Failed to image process'],
			},
			status: 400,
		};
	}

	// save image to disc
	const image_path = `/images/${v4()}${image.name}`;
	const upload_res = await uploadFile(image, image_path, 50);

	if (upload_res === 'Big') {
		return {
			errors: {
				product_image: ['Product image is too big'],
			},
			status: 400,
		};
	} else if (upload_res === 'faild') {
		return {
			errors: {
				product_image: ['Failed to upload image'],
			},
			status: 400,
		};
	}

	// validate inputs
	const validateFields = ProductFormSchema.safeParse({
		product_title: formData.get('product-title'),
		product_image: image_path,
		product_price: Number(formData.get('product-price')),
		product_description: formData.get('product-description'),
	});
	console.log(formData.get('product-price'));
	// validate inputs
	if (!validateFields.success) {
		await deleteFile(image_path);
		return {
			errors: validateFields.error.flatten().fieldErrors,
			status: 400,
		};
	}
	// parse inout
	const { product_image, product_price, product_title, product_description } =
		validateFields.data;
	try {
		// try connect to database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// insert new product
		await db.insert(product).values({
			image: product_image,
			price: product_price,
			title: product_title,
			description: product_description,
		});

		// close database connection
		conn.end();
		revalidatePath('/dashboard/manage-shop', 'page');
		return {
			message: 'Product added successfully',
			status: 200,
		};
	} catch (error) {
		await deleteFile(image_path);
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}
