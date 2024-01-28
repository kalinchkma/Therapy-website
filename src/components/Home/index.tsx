/** @format */

import React from 'react';
import HomePageBanner from './home-banner';
import ServiceSummary from './service-summary';
import ContactSummary from './contact-summary';
import CustomerReview from './customer-review';
import Team from '../common/team';
import OurLocation from './our-location';
import LatestBlog from './latest-blog';

export default function HomePageComponent() {
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
			{/* Meet our Theam */}
			<Team title='Meet our team' />
			{/* Location */}
			<OurLocation />
			{/* Latest blog */}
			<LatestBlog />
		</div>
	);
}
