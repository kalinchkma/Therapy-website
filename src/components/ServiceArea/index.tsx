/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import ServiceAreaCard from '../common/service-area-card';

import { ServiceAreas } from '@/lib/static_data';
import { getAllServiceArea } from '@/methods/service_area-method';
import { getPageBanner } from '@/methods/page-banner-mothod';
import { Banner } from '@/actions/page-banner-actions';

export default async function ServiceAreaCompenent() {
	const all_service_area = await getAllServiceArea();

	const get_banner = await getPageBanner('service-area');

	let page_banner: Banner = {};
	if (get_banner.length > 0) {
		page_banner = JSON.parse(String(get_banner[0].content)) as Banner;
	}

	return (
		<div className='w-full'>
			<PageTitle
				description={
					page_banner.subTitle
						? page_banner.subTitle
						: 'We have a service available over many areas'
				}
				title={page_banner.title ? page_banner.title : 'Services area'}
				className={get_banner.length > 0 ? 'py-0' : ''}
				bgImageUrl={page_banner.bgImage}
				overlayStyles={
					get_banner.length > 0 ? 'bg-zinc-800 py-28 bg-opacity-70' : ''
				}
				titleStyle={get_banner.length > 0 ? 'text-white' : ''}
			/>
			<PageBreadcrumb
				paths={[{ name: 'Home', url: '/' }, { name: 'Service Area' }]}
			/>
			<ContentWrapper className='py-12'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
					{/* -- */}
					{all_service_area.map((servicearea) => {
						const service_area_list = JSON.parse(
							String(servicearea.service_area_list),
						) as { data: string[] };
						return (
							<ServiceAreaCard
								key={servicearea.id}
								className='col-span-1'
								title={servicearea.service_area_name}
								areas={service_area_list.data}
							/>
						);
					})}
				</div>
			</ContentWrapper>
		</div>
	);
}
