/** @format */

'use client';

import React from 'react';
import { Service } from '../Dashboard/Services/columns';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';

export default function IndividualService({ service }: { service: Service }) {
	return (
		<div className='w-full'>
			<PageTitle title={service.name} />
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Services', url: '/services' },
					{ name: service.name },
				]}
			/>
			<ContentWrapper className='py-12'>
				<div>{service.description}</div>
			</ContentWrapper>
		</div>
	);
}
