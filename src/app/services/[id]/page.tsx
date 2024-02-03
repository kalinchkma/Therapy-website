/** @format */

import { Service } from '@/components/Dashboard/Services/columns';
import IndividualService from '@/components/services/individual-service';
import { getServiceById } from '@/methods/services';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function IdividualServicePage({
	params,
}: {
	params: { id: string };
}) {
	const service_id = Number(params.id[String(params).length - 1]);
	const res_service = await getServiceById(service_id);
	if (!res_service) {
		notFound();
	}

	return (
		<div className='w-full'>
			<IndividualService service={res_service[0]} />
		</div>
	);
}
