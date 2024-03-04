/** @format */

import { getPageBanner } from '@/methods/page-banner-mothod';
import React from 'react';
import SetupBlogPage from './setup-blog-page';
import BlogBanner from './blog-banner';

export default async function BlogPageConfig() {
	const get_banner = await getPageBanner('blog');

	return (
		<div className='w-full flex flex-col gap-2'>
			<div className='flex items-center justify-start gap-2'>
				<SetupBlogPage />
			</div>
			{/* page banner */}
			{get_banner.length > 0 && <BlogBanner banner={get_banner[0]} />}
		</div>
	);
}
