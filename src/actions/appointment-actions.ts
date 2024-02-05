/** @format */

'use server';

import { appointments } from '@/db/schema/appointments';
import { config, createDBConnection } from '@/db';

import { sendMail } from '@/mail';

// make appointment
export async function makeAppointment(formData: FormData) {}
