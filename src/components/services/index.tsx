/** @format */

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import PageBreadcrumb from '../common/page-breadcrumb';
import { ServiceCard } from '../common/service-card';
import { Services } from '@/lib/static_data';
import PageTitle from '../common/page-title';

export default function ServicesPageComponent() {
	return (
		<div className='w-full'>
			<PageTitle
				title='Services'
				description='Comprehensive therapy services'
			/>

			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Services', url: '/services' },
				]}
			/>
			<ContentWrapper className='py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{Services.map((service, index) => (
						<ServiceCard
							title={service.title}
							serviceLink={service.serviceLink}
							description={service.description}
							thumbnailImage={service.thumbnailImage}
							key={index}
						/>
					))}
				</div>
			</ContentWrapper>
		</div>
	);
}
