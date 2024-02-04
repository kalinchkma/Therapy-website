/** @format */

'use client';

import React from 'react';
import { Service } from '../Dashboard/Services/columns';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import ActionButton from '../common/action-button';
import Markdown from 'react-markdown';

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
				<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
					<div className='col-span-1 md:col-span-3'>
						<p className='mb-8'>{service.description}</p>
						<Markdown className='content-preview'>{service.content}</Markdown>
					</div>
					<div className='col-span-1 flex flex-col items-start md:items-center md:justify-start'>
						<ActionButton
							link={`/appointment?service=${service.id}`}
							title='Book Appointment'
							className='text-center'
						/>
					</div>
				</div>
			</ContentWrapper>
		</div>
	);
}
