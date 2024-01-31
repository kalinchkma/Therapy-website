/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import ServiceAreaCard from '../common/service-area-card';

import { ServiceAreas } from '@/lib/static_data';

export default function ServiceAreaCompenent() {
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
					{ServiceAreas.map((servicearea) => (
						<ServiceAreaCard
							key={servicearea.area}
							className='col-span-1'
							title={servicearea.area}
							areas={servicearea.areaList}
						/>
					))}
				</div>
			</ContentWrapper>
		</div>
	);
}
