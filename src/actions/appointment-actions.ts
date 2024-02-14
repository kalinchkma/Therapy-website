/** @format */

'use server';

import { appointments } from '@/db/schema/appointments';
import { config, createDBConnection } from '@/db';
import mysql from 'mysql2/promise';

import { sendMail } from '@/mail';
import { z } from 'zod';
import { informations } from '@/db/schema/information';
import { services } from '@/db/schema/services';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// appointment state
export type AppointmentState = {
	errors?: {
		paitent_name?: string[];
		contact_number?: string[];
		email?: string[];
		selected_service?: string[];
		appointment_date?: string[];
		appointment_time?: string[];
		message?: string[];
	};
	status: number;
	message: string;
};

// appointment form schema
const AppointmentFormSchema = z.object({
	paitent_name: z.string({
		invalid_type_error: 'Invalid paitent name',
	}),
	contact_number: z
		.string({
			invalid_type_error: 'Invalid contact number',
		})
		.min(11, { message: 'Invalid mobile number' }),
	email: z
		.string({
			invalid_type_error: 'Invalid Email',
		})
		.optional(),
	selected_service: z.string({
		invalid_type_error: 'Invalid service',
	}),
	appointment_date: z.string({
		invalid_type_error: 'Invalid data',
	}),
	appointment_time: z.string({
		invalid_type_error: 'Please select current time',
	}),
	message: z
		.string({
			invalid_type_error: 'Invalid message',
		})
		.optional(),
});
// make appointment
export async function createAppointment(
	id: number,
	appointment_type: string,
	prevState: AppointmentState | undefined,
	formData: FormData,
) {
	console.log(formData.get('selected-service'));
	// validate inputs
	const validateFields = AppointmentFormSchema.safeParse({
		paitent_name: formData.get('paitent-name'),
		contact_number: formData.get('contact-number'),
		email: formData.get('email'),
		selected_service: formData.get('selected-service'),
		appointment_date: formData.get('appointment-date'),
		appointment_time: formData.get('appointment-time'),
		message: formData.get('message'),
	});

	// validate user input
	if (!validateFields.success) {
		return {
			errors: validateFields.error.flatten().fieldErrors,
			status: 400,
			message: 'User input error',
		};
	}
	// parse user input
	const {
		appointment_date,
		appointment_time,
		contact_number,
		paitent_name,
		selected_service,
		email,
		message,
	} = validateFields.data;
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		// try to store appointment into database
		await db.insert(appointments).values({
			patient_name: paitent_name,
			selected_service: Number(selected_service),
			contact_number: contact_number,
			appointment_date: appointment_date,
			appointment_time: appointment_time,
			user_id: id,
			contact_email: email,
			message: message,
			appointment_type: appointment_type,
		});

		// get admin emails
		const information = await db.select().from(informations);
		if (information.length > 0) {
			const service = await db
				.select()
				.from(services)
				.where(eq(services.id, Number(selected_service)));
			let service_name = '';
			if (service.length > 0) {
				service_name = service[0].name;
			}
			// appointment template
			const template = `
            <html>
            <body>
                <h1>New Appointment have been recived</h1>
                <p>Find out about appointment information........</p>
                <hr />
                <ul>
                    <li>Patient Name: ${paitent_name}</li>
                    <li>Service: ${service_name}</li>
                    <li>Contact number: ${contact_number}</li>
                    <li>Email: ${email}</li>
                    <li>Appointment Date: ${appointment_date}</li>
                    <li>Appointment time: ${appointment_time}</li>
                </ul>
            </body>
            </html>
            `;

			// send email to every admin user
			information[0].emails.split(',').forEach(async (email, index) => {
				// send email to admin user
				await sendMail({
					to: email.trim(),
					subject: 'New appointment',
					res: template,
				});
			});

			// if user email is available send email to user
			if (email) {
				const template2 = `
                <html>
                <body>
                    <h1>Thank you for your appointment</h1>
                    <p>Find out about appointment information........</p>
                    <hr />
                    <ul>
                        <li>Patient Name: ${paitent_name}</li>
                        <li>Service: ${service_name}</li>
                        <li>Contact number: ${contact_number}</li>
                        <li>Email: ${email}</li>
                        <li>Appointment Date: ${appointment_date}</li>
                        <li>Appointment time: ${appointment_time}</li>
                    </ul>
                    <p>If you have any query you can contact us: ${information[0].contact_numbers}</p>
                </body>
                </html>
            `;
				// send mail to paitent
				await sendMail({
					to: email?.trim(),
					subject: 'New Appointment',
					res: template2,
				});
			}
		}

		// close database connection
		conn.end();
		return {
			status: 200,
			message:
				'You have successfully submited you appointment, we will contact to you',
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			message: 'Internal server error',
		};
	}
}

// delete appointment
export async function deleteAppointment(id: number, formData: FormData) {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		await db.delete(appointments).where(eq(appointments.id, id));
		// close connection
		conn.end();
		revalidatePath('/dashboard/appointments', 'page');
	} catch (error) {
		redirect('/errors');
	}
}
