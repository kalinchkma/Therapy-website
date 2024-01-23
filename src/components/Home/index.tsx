/** @format */

import React from 'react';
import HomePageBanner from './home-banner';
import ServiceSummary from './service-summary';
import ContactSummary from './contact-summary';
import CustomerReview from './customer-review';

export default function HomePage() {
	return (
		<div className='w-full'>
			{/* banner with slider */}
			<HomePageBanner />
			{/* Our service summary */}
			<ServiceSummary />
			{/* Contact summary */}
			<ContactSummary />
			{/* Customer review */}
			<CustomerReview />
		</div>
	);
}
