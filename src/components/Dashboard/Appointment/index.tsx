/** @format */

import React from 'react';
import AppointmentTable from './appointment-table';
import { Appointment } from './columns';
import { getAppointments } from '@/methods/appointment-method';

export default async function AppointmentPageComponent() {
	const appointments = await getAppointments();

	return (
		<div className='w-full'>
			<AppointmentTable data={appointments as Appointment[]} />
		</div>
	);
}
