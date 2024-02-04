/** @format */

import { GetServerSideProps } from 'next';

import AppointmentPageComponent from '@/components/Appointment';
import React from 'react';

export default function AppointmentPage() {
	return (
		<div className='w-full'>
			<AppointmentPageComponent />
		</div>
	);
}
