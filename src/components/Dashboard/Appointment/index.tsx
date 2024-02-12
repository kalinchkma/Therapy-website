/** @format */

import React from 'react';
import AppointmentTable from './appointment-table';
import { Appointment } from './columns';

export default async function AppointmentPageComponent() {
	return (
		<div className='w-full'>
			<AppointmentTable data={[]} />
		</div>
	);
}
