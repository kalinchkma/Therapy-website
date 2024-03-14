/** @format */

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import PageBreadcrumb from '../common/page-breadcrumb';
import { ServiceCard } from '../common/service-card';
import PageTitle from '../common/page-title';
import { getAllServicesPublic } from '@/methods/services-method';
import { notFound } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { getPageBanner } from '@/methods/page-banner-mothod';
import { Banner } from '@/actions/page-banner-actions';

export default async function ServicesPageComponent() {
	const allServices = await getAllServicesPublic();
	if (!allServices) {
		notFound();
	}
	const get_banner = await getPageBanner('services');

	let page_banner: Banner = {};
	if (get_banner.length > 0) {
		page_banner = JSON.parse(String(get_banner[0].content)) as Banner;
	}
	const host = process.env.HOST!;
	return (
		<div className='w-full'>
			<PageTitle
				description={
					page_banner.subTitle
						? page_banner.subTitle
						: 'Check out comprehensive therapy services'
				}
				title={page_banner.title ? page_banner.title : 'Services'}
				className={get_banner.length > 0 ? 'py-0' : ''}
				bgImageUrl={`${host}${page_banner.bgImage}`}
				overlayStyles={
					get_banner.length > 0 ? 'bg-zinc-800 py-28 bg-opacity-70' : ''
				}
				titleStyle={get_banner.length > 0 ? 'text-white' : ''}
			/>

			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Services', url: '/services' },
				]}
			/>
			<ContentWrapper className='py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{allServices.length > 0 ? (
						allServices.map((service, index) => (
							<ServiceCard
								title={service.name}
								serviceLink={`/services/${service.id}`}
								description={service.description!}
								thumbnailImage={`${host}${service.thumbnailImage}`}
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
