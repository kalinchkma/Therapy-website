/** @format */

import React from 'react';
import HomePageBanner from './home-banner';
import ServiceSummary from './service-summary';
import ContactSummary from './contact-summary';
import CustomerReview from './customer-review';
import Team from '../common/team';
import OurLocation from './our-location';
import LatestBlog from './latest-blog';
import { getInformations } from '@/methods/information-method';
import { redirect } from 'next/navigation';

export default async function HomePageComponent() {
	const information = await getInformations();
	if (information.length <= 0) {
		redirect('/errors');
	}
	return (
		<div className='w-full'>
			{/* banner with slider */}
			<HomePageBanner />
			{/* Our service summary */}
			<ServiceSummary />
			{/* Contact summary */}
			<ContactSummary information={information[0]} />
			{/* Customer review */}
			<CustomerReview />
			{/* Meet our Theam */}
			<Team
				title='Meet our team'
				className='bg-blue-900'
				titleStyles='text-white'
			/>
			{/* Location */}
			<OurLocation />
			{/* Latest blog */}
			<LatestBlog />
		</div>
	);
}
