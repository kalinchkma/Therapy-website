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

export default async function BlogPageComponent({
	all_blog,
}: {
	all_blog: Post[];
}) {
	const all_blog_key = await getBlogs();

	return (
		<div className='w-full'>
			<PageTitle
				title='Blog'
				description='Read all blog know about our services'
			/>
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Blog', url: '/blog' },
				]}
			/>
			<ContentWrapper className='py-16'>
				<div className='grid grid-cols-4 gap-10 md:px-12 lg:px-0'>
					{/* all blog list */}
					<AllBlogPost
						posts={all_blog}
						uid={uuidv4()}
						all_blog_key={all_blog_key}
						host={HOST!}
					/>
				</div>
			</ContentWrapper>
		</div>
	);
}
