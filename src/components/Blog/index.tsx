/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import BlogCard from '../common/blog-card';

import Link from 'next/link';
import { getBlogs } from '@/methods/blog-method';
import { v4 as uuidv4 } from 'uuid';
import SideMenu from './side-menu';
import AllBlogPost from './all_blog_post';

type Post = {
	id: number;
	createdAt: Date | null;
	updatedAt: Date | null;
	title: string;
	thumbnailImage: string | null;
	summary: string;
	content: string | null;
	author: string;
	comment: number | null;
	keywords: string | null;
};
import { HOST } from '@/lib/static_data';
import { getPageBanner } from '@/methods/page-banner-mothod';
import { Banner } from '@/actions/page-banner-actions';

export default async function BlogPageComponent({
	all_blog,
}: {
	all_blog: Post[];
}) {
	const all_blog_key = await getBlogs();
	const get_banner = await getPageBanner("blog");

	let page_banner: Banner = {};
	if (get_banner.length > 0) {
		page_banner = JSON.parse(String(get_banner[0].content)) as Banner
	}
	
	return (
		<div className='w-full'>
			<PageTitle
				description={page_banner.subTitle ? page_banner.subTitle : ''}
				title={page_banner.title ? page_banner.title : "Blog"}
				className={get_banner.length > 0 ? 'py-0' : ''}
				bgImageUrl={page_banner.bgImage}
				overlayStyles={get_banner.length > 0 ? 'bg-zinc-800 py-28 bg-opacity-70' : ''}
				titleStyle={get_banner.length > 0 ? 'text-white' : ''}
			/>
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Blog', url: '/blog' },
				]}
			/>
			<ContentWrapper className='py-16'>
				{all_blog_key.length <= 0 ? (
					<div className='flex items-center justify-center h-full w-full'>
						<h4>No Blog post found</h4>
					</div>
				) : (
					<div className='grid grid-cols-4 gap-10 md:px-12 lg:px-0'>
						{/* all blog list */}
						<AllBlogPost
							posts={all_blog}
							uid={uuidv4()}
							all_blog_key={all_blog_key}
							host={HOST!}
						/>
					</div>
				)}
			</ContentWrapper>
		</div>
	);
}
