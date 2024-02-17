/** @format */

import PagesPageComponent from '@/components/Dashboard/Pages';
import React from 'react';

type Props = {
	params: {
		page: string;
	};
};

export default function PagesPage({ params }: Props) {
	return (
		<div className='w-full'>
			<PagesPageComponent params={params} />
		</div>
	);
}
