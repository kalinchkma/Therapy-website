/** @format */

import { getPageBanner } from '@/methods/page-banner-mothod';
import React from 'react';
import SetupContactPage from './setup-contact-page';
import ContactBanner from './contact-banner';

export default async function ContactPageConfig() {
	const get_banner = await getPageBanner('contact');

	return (
		<div className='w-full flex flex-col gap-2'>
			{get_banner.length <= 0 && (
				<div className='flex items-center justify-start gap-2'>
					<SetupContactPage />
				</div>
			)}
			{/* page banner */}
			{get_banner.length > 0 && (
				<ContactBanner
					banner={get_banner[0]}
					host={process.env.HOST as string}
				/>
			)}
		</div>
	);
}
