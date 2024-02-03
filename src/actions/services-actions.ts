/** @format */

'use server';
import { z } from 'zod';
import mysql from 'mysql2/promise';
import { config, createDBConnection } from '@/db/index';
import { services } from '@/db/schema/services';
import { deleteFile, uploadFile } from '@/lib/helper_function';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

/**
 * ------------------------------------------------------------
 * Create new service action function
 * ------------------------------------------------------------
 */

const CreateServiceSchema = z.object({
	name: z
		.string({
			invalid_type_error: 'Invalid name new must be a text',
		})
		.min(4, {
			message:
				'Service name is too short! service name must be 4 or more character',
		}),
	description: z
		.string({
			invalid_type_error: 'Invalid description, description must be a text',
		})
		.min(100, { message: 'Minimum character is 100 or more' }),
	price: z
		.string({
			invalid_type_error: 'Price must be a Number',
		})
		.optional(),
	thumbnailImage: z.string({
		invalid_type_error: 'File name error',
	}),
});

export type FromState = {
	error?: {
		name?: string[];
		description?: string[];
		price?: string[];
		thumbnailImage?: string[];
	};
	message?: string;
	status: number;
};

// create new service
export async function createNewService(
	prevState: FromState,
	formData: FormData,
) {
	// validate file input
	const thumbnailImageFile = formData.get('thumbnail') as File;
	if (thumbnailImageFile.size <= 0) {
		return {
			status: 400,
			error: {
				thumbnailImage: ['Please provide a thumbnailImage of a service'],
			},
		};
	}

	// save the thumbnail image to disc
	const thumbnailImagePath = `/images/${uuidv4()}${thumbnailImageFile.name}`;
	const upload_thumbnail = await uploadFile(
		thumbnailImageFile,
		thumbnailImagePath,
		50,
	);

	// handler file upload error
	if (upload_thumbnail === 'Big') {
		return {
			status: 400,
			error: {
				thumbnailImage: ['Image size is too big'],
			},
		};
	} else if (upload_thumbnail === 'faild') {
		return {
			status: 400,
			message: 'Internal server error please try again',
		};
	}

	// validate text input
	const validatedFields = CreateServiceSchema.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
		price: formData.get('price'),
		thumbnailImage: thumbnailImagePath,
	});

	// if not validate input
	if (!validatedFields.success) {
		return {
			status: 400,
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { description, name, thumbnailImage, price } = validatedFields.data;

	try {
		// connect to database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// perform database connection
		await db.insert(services).values({
			name: name,
			thumbnailImage: thumbnailImage,
			description: description,
			price: price,
			published: 0,
		});

		// close the connection of database
		conn.end();

		// revalidate service page
		revalidatePath('/dashboard/services', 'page');

		return {
			status: 200,
			message: 'Service created successfully',
		};
	} catch (err) {
		return {
			status: 400,
			message: 'Internal service error. Try again',
		};
	}
}

/**
 * ---------------------------------------------------------------
 * Update service schema action function
 * ---------------------------------------------------------------
 */

// name update form schema
const NmFormSchema = z.object({
	name: z
		.string({
			invalid_type_error: 'Invalid name new must be a text',
		})
		.min(4, {
			message:
				'Service name is too short! service name must be 4 or more character',
		}),
});

export type UpdateServiceNameFormState = {
	error?: { name?: string[] };
	message?: string;
	status: number;
};

// update service name
export async function updateServiceName(
	id: number,
	prevState: UpdateServiceNameFormState | undefined,
	formData: FormData,
) {
	// validate input
	const validatedFields = NmFormSchema.safeParse({
		name: formData.get('name'),
	});

	if (!validatedFields.success) {
		return {
			status: 400,
			error: validatedFields.error.flatten().fieldErrors,
		};
	}

	// parse user input
	const { name } = validatedFields.data;

	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// perform update operation
		await db
			.update(services)
			.set({
				name: name,
			})
			.where(eq(services.id, id));

		// close database connection
		conn.end();
		revalidatePath('/dashboard/services', 'page');
		return {
			status: 200,
			message: 'Name updated successfully',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

/**
 * ----------------------------------------------------------------
 * Update service description action function
 * ----------------------------------------------------------------
 */

const DesFormSchema = z.object({
	description: z
		.string({
			invalid_type_error: 'Invalid description, description must be a text',
		})
		.min(100, { message: 'Minimum character is 100 or more' }),
});

export type UpdateServiceDescriptionFormState = {
	error?: { description?: string[] };
	message?: string;
	status: number;
};

export async function updateServiceDescription(
	id: number,
	prevState: UpdateServiceDescriptionFormState | undefined,
	formData: FormData,
) {
	// validate form data
	const validatedFields = DesFormSchema.safeParse({
		description: formData.get('description'),
	});

	// check input validation
	if (!validatedFields.success) {
		return {
			status: 400,
			error: validatedFields.error.flatten().fieldErrors,
		};
	}
	// parse description
	const { description } = validatedFields.data;

	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db
			.update(services)
			.set({
				description: description,
			})
			.where(eq(services.id, id));

		// End database connection
		conn.end();
		revalidatePath('/dashboard/services', 'page');

		return {
			status: 200,
			message: 'Description updated successfully',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

/**
 * --------------------------------------------------------------
 * Update service price action function
 * --------------------------------------------------------------
 */
const PriceFormSchema = z.object({
	price: z.string({
		invalid_type_error: 'Price must be a Number',
	}),
});

export type UpdateServicePriceFormState = {
	error?: { price?: string[] };
	message?: string;
	status: number;
};

export async function updateServicePrice(
	id: number,
	prevState: UpdateServicePriceFormState | undefined,
	formData: FormData,
) {
	// validate form data
	const validatedFields = PriceFormSchema.safeParse({
		price: formData.get('price'),
	});

	// check validation
	if (!validatedFields.success) {
		return {
			status: 400,
			error: validatedFields.error.flatten().fieldErrors,
		};
	}
	// parse input data
	const { price } = validatedFields.data;

	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// perform update operation
		await db
			.update(services)
			.set({
				price: price,
			})
			.where(eq(services.id, id));

		// end database connection
		conn.end();
		revalidatePath('/dashboard/services', 'page');
		return {
			status: 200,
			message: 'Price updated successfully',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

/**
 * -------------------------------------------------------------------
 * Publish and unpublish service action function
 * -------------------------------------------------------------------
 */

export async function updateServicePublishState(id: number) {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// perform update query
		const service = await db.select().from(services).where(eq(services.id, id));
		if (service.length < 0) {
			redirect('/errors');
		}
		if (service[0].published) {
			await db
				.update(services)
				.set({
					published: 0,
				})
				.where(eq(services.id, id));
		} else {
			await db
				.update(services)
				.set({
					published: 1,
				})
				.where(eq(services.id, id));
		}

		// close database connection
		conn.end();
		revalidatePath('/dashboard/services', 'page');
	} catch (error) {
		redirect('/errors');
	}
}

/**
 * ---------------------------------------------------------------
 * Update service image action function
 * ---------------------------------------------------------------
 */

export async function updateServiceImage(id: number, formData: FormData) {
	// check image available on the formdata
	const newImage = formData.get('image') as File;

	if (newImage.size <= 0) {
		redirect('/errors');
	} else {
		try {
			// create database connection
			const conn = mysql.createPool(config);
			const db = createDBConnection(conn);

			// find the service and delete old image
			const service = await db
				.select()
				.from(services)
				.where(eq(services.id, id));

			if (service.length <= 0) {
				// end database connection
				conn.end();
				redirect('/errors');
			} else {
				// delete the old image
				const delete_res = await deleteFile(service[0].thumbnailImage);
				if (!delete_res) {
					// end database connection
					conn.end();
					redirect('/errors');
				} else {
					// upload and update new image
					const newImagePath = `/images/${uuidv4()}${newImage.name}`;
					const upload_res = await uploadFile(newImage, newImagePath, 50);
					if (upload_res === 'Big' || upload_res === 'faild') {
						// close database connection
						conn.end();
						redirect('/errors');
					} else {
						await db
							.update(services)
							.set({ thumbnailImage: newImagePath })
							.where(eq(services.id, id));
						// close database connection
						conn.end();
						revalidatePath('/dashboard/services', 'page');
					}
				}
			}
		} catch (error) {
			redirect('/errors');
		}
	}
}

/**
 * ----------------------------------------------------------------
 * Delete service action function
 * ----------------------------------------------------------------
 */

export async function deleteService(id: number) {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// find the service and delete product associate image
		const service = await db.select().from(services).where(eq(services.id, id));

		if (service.length <= 0) {
			// close database connection
			conn.end();
			redirect('/errors');
		} else {
			const delete_res = await deleteFile(service[0].thumbnailImage);

			if (!delete_res) {
				// close database connection
				conn.end();
				redirect('/errors');
			} else {
				await db.delete(services).where(eq(services.id, id));
				// close database connection
				conn.end();

				revalidatePath('/dashboard/services', 'page');
			}
		}
	} catch (error) {
		redirect('/errors');
	}
}

/**
 * ----------------------------------------------------
 * Service content action function
 * ----------------------------------------------------
 */
const UpdateServiceContentSchema = z.object({
	content: z.string({
		invalid_type_error: 'Invalid content format',
	}),
});

export type UpdateServiceContentState = {
	errors?: {
		content?: string[];
	};
	status: number;
	message?: string;
};

export async function updateServiceContent(
	id: number,
	prevState: UpdateServiceContentState | undefined,
	formData: FormData,
) {
	// validate input
	const validatedFields = UpdateServiceContentSchema.safeParse({
		content: formData.get('content'),
	});

	// check validate error
	if (!validatedFields.success) {
		return {
			status: 400,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	// if no error parse input data
	const { content } = validatedFields.data;

	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		// perform query
		await db
			.update(services)
			.set({ content: content })
			.where(eq(services.id, id));

		// close connection
		conn.end();

		revalidatePath('/dashboard/services', 'page');
		return {
			status: 200,
			message: 'Content update successfully',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}
