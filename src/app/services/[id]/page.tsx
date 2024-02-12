/** @format */

import { Service } from '@/components/Dashboard/Services/columns';
import IndividualService from '@/components/services/individual-service';
import { getServiceById } from '@/methods/services-method';
import { notFound } from 'next/navigation';
import React from 'react';
import { unstable_noStore as noStore } from 'next/cache';

export default async function IdividualServicePage({
	params,
}: {
	params: { id: string };
}) {
	noStore();
	const service_id = Number(params.id.slice(-1));
	const res_service = await getServiceById(service_id);
	if (!res_service) {
		notFound();
	}

	if (res_service[0].published === 0) {
		notFound();
	}

	return (
		<div className='w-full'>
			<IndividualService service={res_service[0]} />
		</div>
	);
}
