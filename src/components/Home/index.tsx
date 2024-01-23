/** @format */

import React from 'react';
import HomePageBanner from './home-banner';
import ServiceSummary from './service-summary';
import ContactSummary from './contact-summary';

export default function HomePage() {
	return (
		<div className='w-full'>
			{/* banner with slider */}
			<HomePageBanner />
			{/* Our service summary */}
			<ServiceSummary />
			{/* Contact summary */}
			<ContactSummary />
		</div>
	);
}
