/** @format */

import React from 'react';
import ServiceDataTable from './service-table';

import { data } from './columns';

export default function ServicesPageComponent() {
	return (
		<div className='w-full p-8'>
			<ServiceDataTable data={data} />
		</div>
	);
}
