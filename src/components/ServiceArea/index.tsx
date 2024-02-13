/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import ServiceAreaCard from '../common/service-area-card';

import { ServiceAreas } from '@/lib/static_data';
import { getAllServiceArea } from '@/methods/service_area-method';

export default async function ServiceAreaCompenent() {
	const all_service_area = await getAllServiceArea();
	return (
		<div className='w-full'>
			<PageTitle
				title='Our Service Area'
				description='We have a service available over many areas'
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
