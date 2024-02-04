/** @format */

'use server';

import { appointments } from '@/db/schema/appointments';
import { config, createDBConnection } from '@/db';

// make appointment
export async function makeAppointment(formData: FormData) {
	console.log(formData);
}
