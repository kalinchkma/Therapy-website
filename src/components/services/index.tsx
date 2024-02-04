/** @format */

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import PageBreadcrumb from '../common/page-breadcrumb';
import { ServiceCard } from '../common/service-card';
import PageTitle from '../common/page-title';
import { getAllServices } from '@/methods/services';
import { notFound } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default async function ServicesPageComponent() {
	const allServices = await getAllServices();
	if (!allServices) {
		notFound();
	}
	// filter published services
	const services = allServices.filter((service) => service.published === 1);
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
					{services.length > 0 ? (
						services.map((service, index) => (
							<ServiceCard
								title={service.name}
								serviceLink={`/services/${uuidv4()}${service.id}`}
								description={service.description!}
								thumbnailImage={service.thumbnailImage}
								key={index}
							/>
						))
					) : (
						<div className='w-full col-span-3 flex items-center justify-center p-10'>
							<p>No services found</p>
						</div>
					)}
				</div>
			</ContentWrapper>
		</div>
	);
}
