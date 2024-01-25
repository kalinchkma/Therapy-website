/** @format */

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import PageBanner from '../common/page-banner';
import PageBreadcrumb from '../common/page-breadcrumb';
import { ServiceCard } from '../common/service-card';
import { Services } from '@/lib/static_data';

export default function ServicesPageComponent() {
	return (
		<div className='w-full'>
			<PageBanner className='w-full py-14 bg-zinc-100'>
				<ContentWrapper>
					<h1 className='font-bold text-4xl text-zinc-600'>Services</h1>
					<p className='text-zinc-400 text-lg'>
						Comprehensive therapy services
					</p>
				</ContentWrapper>
			</PageBanner>

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
