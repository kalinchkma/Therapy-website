/** @format */

import { getPageBanner } from '@/methods/page-banner-mothod';
import React from 'react';
import SetupOurPackagePage from './setup-our-package-page';
import OurPackageBanner from './our-package-banner';

export default async function OurPackagesConfig() {
	const get_banner = await getPageBanner('our-package');

	return (
		<div className='w-full flex flex-col gap-2'>
			{get_banner.length <= 0 && (
				<div className='flex items-center justify-start gap-2'>
					<SetupOurPackagePage />
				</div>
			)}
			{/* page banner */}
			{get_banner.length > 0 && <OurPackageBanner banner={get_banner[0]} />}
		</div>
	);
}
