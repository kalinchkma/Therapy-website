/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';

import { fetchAllProductClient } from '@/methods/product-method';

import ShopWrapper from './shop-wrapper';

export default async function ShopPageComponent({
	search,
}: {
	search: string;
}) {
	const all_products = await fetchAllProductClient(search);

	return (
		<div className='w-full'>
			<PageTitle title='Shop' />
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Shop', url: '/shop' },
				]}
			/>
			<ContentWrapper className='py-12 '>
				<ShopWrapper all_products={all_products} />
			</ContentWrapper>
		</div>
	);
}
