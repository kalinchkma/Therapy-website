/** @format */

'use server';

import { config, createDBConnection } from '@/db';
import { informations } from '@/db/schema/information';
import { deleteFile, uploadFile } from '@/lib/helper_function';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuid4 } from 'uuid';
import { z } from 'zod';

// setup website information
export async function setupWebInformation() {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		await db.insert(informations).values({
			openning_hours: {
				Friday: '',
				Saturday: '',
				Sunday: '',
				Monday: '',
				Tuesday: '',
				Wednessday: '',
				Thursday: '',
			},
			contact_numbers: '',
			emails: '',
			location: '',
			logo: '',
			social_links: {
				Facebook: '',
				Instagram: '',
				Twitter: '',
				LinkedIn: '',
				YouTube: '',
			},
			website_name: '',
		});
		// close database connection
		conn.end();
		// return
		revalidatePath('/dashboard/manage-information', 'page');
	} catch (error) {
		redirect('/errors');
	}
}

// update website logo
export async function updateWebsiteLogo(
	id: number,
	prevState: string | undefined,
	formData: FormData,
) {
	// check file exist
	const logo = formData.get('logo') as File;

	if (logo.size <= 0) {
		return 'Please attech a Image of a logo';
	}

	// connect to database
	const conn = mysql.createPool(config);
	const db = createDBConnection(conn);

	const information = await db
		.select()
		.from(informations)
		.where(eq(informations.id, id));
	if (information.length <= 0) {
		conn.end();
		return 'Server error';
	}

	// delete if previous logo is there
	if (information[0].logo !== '') {
		const del_res = await deleteFile(information[0].logo);
		if (!del_res) {
			conn.end();
			return 'Internal server error';
		}
	}

	const filePath = `/images/${uuid4()}${logo.name}`;
	const upload_res = await uploadFile(logo, filePath, 10);
	if (upload_res === 'Big') {
		conn.end();
		return 'File is too large, file must be a less than or equal 10MB';
	} else if (upload_res === 'faild') {
		conn.end();
		return 'Internal server error';
	} else {
		try {
			await db
				.update(informations)
				.set({
					logo: filePath,
				})
				.where(eq(informations.id, id));
			// close connection
			conn.end();
			revalidatePath('/dashboard/manage-information', 'page');
		} catch (error) {
			conn.end();
			return 'Internal server error';
		}
	}
}

const NameFormSchema = z.object({
	website_name: z.string({
		invalid_type_error: 'Name must be a text',
	}),
});

// update website name
export async function updateWebsiteName(
	id: number,
	prevState: string | undefined,
	formData: FormData,
) {
	// validate user input
	const validateFields = NameFormSchema.safeParse({
		website_name: formData.get('website-name'),
	});
	// validate success
	if (!validateFields.success) {
		return 'Name must ne a text';
	}

	// parse data
	const { website_name } = validateFields.data;

	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		await db
			.update(informations)
			.set({
				website_name: website_name,
			})
			.where(eq(informations.id, id));
		// close connection
		conn.end();
		revalidatePath('/dashboard/manage-information', 'page');
	} catch (error) {
		return 'Internal server error';
	}
}

const LocationFormSchema = z.object({
	location: z.string({
		invalid_type_error: 'Location must be a text format',
	}),
});

// update location
export async function updateLocation(
	id: number,
	prevState: string | undefined,
	formData: FormData,
) {
	// validate input
	const validateFields = LocationFormSchema.safeParse({
		location: formData.get('location'),
	});

	// validate error
	if (!validateFields.success) {
		return 'Location must be a text format';
	}
	const { location } = validateFields.data;
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		await db
			.update(informations)
			.set({
				location: location,
			})
			.where(eq(informations.id, id));
		// close database connection
		conn.end();
		revalidatePath('/dashboard/manage-information', 'page');
	} catch (error) {
		return 'Internal server error';
	}
}

const EmailFormSchema = z.object({
	email: z.string({
		invalid_type_error: 'Email must be a text format',
	}),
});

// update location
export async function updateEmail(
	id: number,
	prevState: string | undefined,
	formData: FormData,
) {
	// validate input
	const validateFields = EmailFormSchema.safeParse({
		email: formData.get('email'),
	});

	// validate error
	if (!validateFields.success) {
		return 'Email must be a text format';
	}
	const { email } = validateFields.data;
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		await db
			.update(informations)
			.set({
				emails: email,
			})
			.where(eq(informations.id, id));
		// close database connection
		conn.end();
		revalidatePath('/dashboard/manage-information', 'page');
	} catch (error) {
		return 'Internal server error';
	}
}

const ContactFormSchema = z.object({
	contacts: z.string({
		invalid_type_error: 'Contacts must be a text format',
	}),
});

// update location
export async function updateContact(
	id: number,
	prevState: string | undefined,
	formData: FormData,
) {
	// validate input
	const validateFields = ContactFormSchema.safeParse({
		contacts: formData.get('contacts'),
	});

	// validate error
	if (!validateFields.success) {
		return 'Contacts must be a text format';
	}
	const { contacts } = validateFields.data;
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		await db
			.update(informations)
			.set({
				contact_numbers: contacts,
			})
			.where(eq(informations.id, id));
		// close database connection
		conn.end();
		revalidatePath('/dashboard/manage-information', 'page');
	} catch (error) {
		return 'Internal server error';
	}
}

const OpenningHoursFormSchema = z.object({
	openning_hours: z.string({
		invalid_type_error: 'Invalid format',
	}),
});

// update openning hours
export async function updateOpenningHours(
	id: number,
	prevState: string | undefined,
	formData: FormData,
) {
	// validate inputs
	const validateFields = OpenningHoursFormSchema.safeParse({
		openning_hours: formData.get('openning-hours'),
	});

	// validate errors
	if (!validateFields.success) {
		return 'Invalid format';
	}

	// else parse input
	const { openning_hours } = validateFields.data;

	try {
		// create db connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db
			.update(informations)
			.set({
				openning_hours: JSON.parse(openning_hours),
			})
			.where(eq(informations.id, id));
		// close connecttion
		conn.end();
		revalidatePath('/dashboard/manage-information', 'page');
	} catch (error) {
		return 'Internal server error';
	}
}

const SocialLinksFormSchema = z.object({
	social_links: z.string({
		invalid_type_error: 'Invalid format',
	}),
});

// update social links
export async function updateSocialLinks(
	id: number,
	prevState: string | undefined,
	formData: FormData,
) {
	// validate inputs
	const validateFields = SocialLinksFormSchema.safeParse({
		social_links: formData.get('social-links'),
	});

	// validate errors
	if (!validateFields.success) {
		return 'Invalid format';
	}

	// else parse input
	const { social_links } = validateFields.data;

	try {
		// create db connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		await db
			.update(informations)
			.set({
				social_links: JSON.parse(social_links),
			})
			.where(eq(informations.id, id));
		// close connecttion
		conn.end();
		revalidatePath('/dashboard/manage-information', 'page');
	} catch (error) {
		return 'Internal server error';
	}
}
