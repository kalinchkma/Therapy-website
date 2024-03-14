/** @format */

import { getPageBanner } from '@/methods/page-banner-mothod';
import React from 'react';
import SetupServiceAreaPage from './setup-service-area-page';
import ServiceAreaBanner from './service-area-banner';

export default async function ServiceAreaConfig() {
	const get_banner = await getPageBanner('service-area');

	return (
		<div className='w-full flex flex-col gap-2'>
			{get_banner.length <= 0 && (
				<div className='flex items-center justify-start gap-2'>
					<SetupServiceAreaPage />
				</div>
			)}
			{/* page banner */}
			{get_banner.length > 0 && <ServiceAreaBanner banner={get_banner[0]} />}
		</div>
	);
}
