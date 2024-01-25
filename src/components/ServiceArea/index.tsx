/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import ServiceAreaCard from '../common/service-area-card';

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
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
					{/* -- */}

					<ServiceAreaCard
						className='col-span-1'
						title='Gulshan Area'
						areas={['Gulshan 1', 'Gulshan 2', 'Baridhara DOHS']}
					/>
				</div>
			</ContentWrapper>
		</div>
	);
}
