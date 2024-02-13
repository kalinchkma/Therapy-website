/** @format */

import ServiceAreaCard from '@/components/common/service-area-card';
import { Button } from '@/components/ui/button';
import React from 'react';
import UpdateServiceArea from './update-service-area';

export default function AllServiceArea({
	all_service_area,
}: {
	all_service_area: {
		id: number;
		service_area_name: string;
		service_area_list: unknown;
	}[];
}) {
	return (
		<div className='grid grid-cols-4 gap-8'>
			{all_service_area.map((service_area, index) => {
				const service_area_list = JSON.parse(
					String(service_area.service_area_list),
				) as { data: string[] };
				return (
					<ServiceAreaCard
						key={index}
						title={service_area.service_area_name}
						areas={service_area_list.data}
						admin={
							<div className='flex items-center justify-center gap-2 mt-8'>
								<UpdateServiceArea ServiceArea={service_area} />
								<Button variant='destructive'>Delete</Button>
							</div>
						}
					/>
				);
			})}
		</div>
	);
}
