/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import Image from 'next/image';
import Team from '../common/team';
import { getAbout, getPageBanner } from '@/methods/page-banner-mothod';
import { Banner } from '@/actions/page-banner-actions';
import Markdown from 'react-markdown';

export default async function AboutPageComponent() {
	const get_banner = await getPageBanner('about');
	const about = await getAbout();
	let content: string = '';
	if (about.length > 0) {
		content = (JSON.parse(String(about[0].content)) as { text: string }).text;
	}

	let page_banner: Banner = {};
	if (get_banner.length > 0) {
		page_banner = JSON.parse(String(get_banner[0].content)) as Banner;
	}
	const host = process.env.HOST!;
	return (
		<div className='w-full'>
			<PageTitle
				description={
					page_banner.subTitle
						? page_banner.subTitle
						: 'We offer physiotherapy service since 2017'
				}
				title={page_banner.title ? page_banner.title : 'About Us'}
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
					{ name: 'About us', url: '/about' },
				]}
			/>
			<ContentWrapper className='py-12'>
				<Markdown className='blog-content'>{content}</Markdown>
			</ContentWrapper>
			{/* Team section */}
			<Team title='Our Team' />
		</div>
	);
}
