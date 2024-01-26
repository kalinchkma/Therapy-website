/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import BlogCard from '../common/blog-card';

import { BlogPosts } from '@/lib/static_data';

export default function BlogPageComponent() {
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
					<div className='col-span-4 lg:col-span-3 flex flex-col gap-16'>
						{BlogPosts.map((post, index) => (
							<BlogCard
								key={index}
								author={post.author}
								blogLink=''
								comments={post.comments_count}
								description={post.description}
								thumbnilImage={post.thumbnilImage}
								keywords={post.keywords}
								title={post.title}
							/>
						))}
					</div>
					<div className='col-span-4 lg:col-span-1 border'></div>
				</div>
			</ContentWrapper>
		</div>
	);
}
