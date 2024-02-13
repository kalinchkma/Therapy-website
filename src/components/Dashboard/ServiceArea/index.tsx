/** @format */

import React from 'react';
import AddNewServiceArea from './add-new-service-area';
import { getAllServiceArea } from '@/methods/service_area-method';

import AllServiceArea from './all-service-area';

export default async function ServiceAreaComponent() {
	const all_service_area = await getAllServiceArea();

	return (
		<div className='w-full p-4'>
			<div className='flex items-center justify-start mb-5'>
				<AddNewServiceArea />
			</div>
			<AllServiceArea all_service_area={all_service_area} />
		</div>
	);
}
