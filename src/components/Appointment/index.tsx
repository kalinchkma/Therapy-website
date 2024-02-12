/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import ContentWrapper from '../common/content-wrapper';

import AppointmentForm from './appointment-form';
import ContactInfo from '../Contact/contact-info';
import { getAllServices } from '@/methods/services-method';
import { notFound } from 'next/navigation';
import { getInformations } from '@/methods/information-method';
import { checkAndGetAuth } from '@/lib/helper_function';

export default async function AppointmentPageComponent() {
	const services = await getAllServices();
	if (!services) {
		notFound();
	}
	const getInformation = await getInformations();
	let auth_id = -1;
	const auth = await checkAndGetAuth();
	if (auth === '/404') {
		auth_id = -1;
	} else if (auth === '/login') {
		auth_id = -1;
	} else {
		auth_id = Number(auth.id);
	}

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
						<ContactInfo information={getInformation[0]} />
					</div>
					{/* Appointment form */}
					<div className='col-span-3 md:col-span-2'>
						<AppointmentForm
							services={services}
							information={getInformation[0]}
							auth_id={auth_id}
						/>
					</div>
				</div>
			</ContentWrapper>
		</div>
	);
}
