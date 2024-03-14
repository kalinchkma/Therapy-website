/** @format */

import { getPageBanner } from '@/methods/page-banner-mothod';
import React from 'react';
import SetupShopPage from './setup-shop-page';
import ShopBanner from './shop-banner';

export default async function ShopPageConfig() {
	const get_banner = await getPageBanner('shop');

	return (
		<div className='w-full flex flex-col gap-2'>
			{get_banner.length <= 0 && (
				<div className='flex items-center justify-start gap-2'>
					<SetupShopPage />
				</div>
			)}
			{/* page banner */}
			{get_banner.length > 0 && <ShopBanner banner={get_banner[0]} />}
		</div>
	);
}
