/** @format */

import React from 'react';
import SetupAboutPage from './setup-about-page';
import { getPageBanner } from '@/methods/page-banner-mothod';

import { Banner } from '@/actions/page-banner-actions';
import AboutBanner from './about-banner';

export default async function AboutPageConfig() {
	const get_banner = await getPageBanner('about');
	let banner: Banner = {
		bgImage: '',
		subTitle: '',
		title: '',
	};

	if (get_banner.length > 0) {
		banner = JSON.parse(String(get_banner[0].content)) as Banner;
	}
	return (
		<div className='w-full flex flex-col gap-2'>
			<div className='flex items-center justify-start gap-2'>
				<SetupAboutPage />
			</div>
			{/* page banner */}
			{get_banner.length > 0 && <AboutBanner banner={get_banner[0]} />}
		</div>
	);
}
