/** @format */

import { getPageBanner } from '@/methods/page-banner-mothod';
import React from 'react';
import SetupServicesPage from './setup-services-page';
import ServicesBanner from './services-banner';

export default async function ServicesConfig() {
	const get_banner = await getPageBanner('services');

	return (
		<div className='w-full flex flex-col gap-2'>
			{get_banner.length <= 0 && (
				<div className='flex items-center justify-start gap-2'>
					<SetupServicesPage />
				</div>
			)}
			{/* page banner */}
			{get_banner.length > 0 && (
				<ServicesBanner
					banner={get_banner[0]}
					host={process.env.HOST as string}
				/>
			)}
		</div>
	);
}
