/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';

import { fetchAllProductClient } from '@/methods/product-method';

import ShopWrapper from './shop-wrapper';
import { getPageBanner } from '@/methods/page-banner-mothod';
import { Banner } from '@/actions/page-banner-actions';

export default async function ShopPageComponent({
	search,
}: {
	search: string;
}) {
	const all_products = await fetchAllProductClient(search);

	const get_banner = await getPageBanner('shop');

	let page_banner: Banner = {};
	if (get_banner.length > 0) {
		page_banner = JSON.parse(String(get_banner[0].content)) as Banner;
	}
	const host = process.env.HOST!;

	return (
		<div className='w-full'>
			{/* <PageTitle title='Shop' /> */}
			<PageTitle
				description={
					page_banner.subTitle ? page_banner.subTitle : 'Check out products'
				}
				title={page_banner.title ? page_banner.title : 'Shop'}
				className={get_banner.length > 0 ? 'py-0' : ''}
				bgImageUrl={`${host}${page_banner.bgImage}`}
				overlayStyles={
					get_banner.length > 0 ? 'bg-zinc-800 py-28 bg-opacity-70' : ''
				}
				titleStyle={get_banner.length > 0 ? 'text-white' : ''}
			/>
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
