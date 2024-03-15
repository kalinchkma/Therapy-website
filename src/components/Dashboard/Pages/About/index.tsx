/** @format */

import React from 'react';
import SetupAboutPage from './setup-about-page';
import { getAbout, getPageBanner } from '@/methods/page-banner-mothod';

import { Banner } from '@/actions/page-banner-actions';
import AboutBanner from './about-banner';
import AddAboutUs from './add-about-us';

export default async function AboutPageConfig() {
	const get_banner = await getPageBanner('about');
	const about = await getAbout();
	let content: string = '';
	if (about.length > 0) {
		content = (JSON.parse(String(about[0].content)) as { text: string }).text;
	}
	return (
		<div className='w-full flex flex-col gap-2'>
			<AddAboutUs about={content} />
			{get_banner.length <= 0 && (
				<div className='flex items-center justify-start gap-2'>
					<SetupAboutPage />
				</div>
			)}
			{/* page banner */}
			{get_banner.length > 0 && (
				<AboutBanner banner={get_banner[0]} host={process.env.HOST as string} />
			)}
		</div>
	);
}
