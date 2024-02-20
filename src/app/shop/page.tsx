/** @format */

import React from 'react';
import ShopPageComponent from '@/components/Shop';

type Props = {
	params: {
		search?: string;
	};
};

export default function ShopPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	return (
		<div className='w-full relative'>
			<ShopPageComponent search={searchParams.search!} />
		</div>
	);
}
