/** @format */

import React from 'react';
import ServiceDataTable from './service-table';

import { Service } from './columns';
import { getAllServices } from '@/methods/services-method';
import { redirect } from 'next/navigation';

export default async function ServicesPageComponent() {
	const all_services = await getAllServices();
	if (!all_services) {
		redirect('/errors');
	}
	return (
		<div className='w-full p-8'>
			<ServiceDataTable data={all_services as Service[]} />
		</div>
	);
}
