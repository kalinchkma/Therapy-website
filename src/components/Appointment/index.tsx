/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import ContentWrapper from '../common/content-wrapper';

import AppointmentForm from './appointment-form';
import ContactInfo from '../Contact/contact-info';

export default function AppointmentPageComponent() {
	return (
		<div className='w-full'>
			<PageTitle
				title='Book Appointment'
				description='We server a quality physiotherapy services'
			/>
			<ContentWrapper className='py-12'>
				<div className='grid grid-cols-3 gap-4 md:gap-6 lg:gap-10'>
					{/* side info box */}
					<div className='col-span-3 md:col-span-1'>
						<ContactInfo />
					</div>
					{/* Appointment form */}
					<div className='col-span-3 md:col-span-2'>
						<AppointmentForm />
					</div>
				</div>
			</ContentWrapper>
		</div>
	);
}
