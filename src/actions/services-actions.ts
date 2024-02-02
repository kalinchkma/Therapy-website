/** @format */

'use server';
import { z } from 'zod';

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
			invalid_type_error: 'Price must be a string',
		})
		.optional(),
	content: z
		.string({
			invalid_type_error: 'Content must be a string',
		})
		.optional(),
});

// create new service
export async function createNewService(
	prevState: string | undefined,
	formData: FormData,
) {}
