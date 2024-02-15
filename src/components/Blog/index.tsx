/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import BlogCard from '../common/blog-card';
import { Keywords } from '@/lib/static_data';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';
import Link from 'next/link';
import { getBlogs } from '@/methods/blog-method';
import { v4 as uuidv4 } from 'uuid';
import SideMenu from './side-menu';

export default async function BlogPageComponent() {
	const all_blog = await getBlogs();
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
					<div className='col-span-4 lg:col-span-3 flex flex-col gap-16'>
						{all_blog.map((blog, index) => (
							<BlogCard
								key={index}
								author={blog.author}
								blogLink={`/blog/${uuidv4()}${blog.id}`}
								comments={0}
								description={blog.summary}
								thumbnilImage={blog.thumbnailImage!}
								keywords={blog.keywords!}
								title={blog.title}
								createdAt={blog.createdAt}
								className='col-span-1'
							/>
						))}
					</div>
					{/* side menu */}
					<SideMenu />
				</div>
			</ContentWrapper>
		</div>
	);
}
