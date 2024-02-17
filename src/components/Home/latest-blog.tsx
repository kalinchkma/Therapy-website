/** @format */

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import SectionHeader from '../common/section-header';
import { getBlogs } from '@/methods/blog-method';
import BlogCard from '../common/blog-card';
import { v4 } from 'uuid';

export default async function LatestBlog() {
	const all_blog = await getBlogs();
	return (
		<section className='w-full py-28'>
			<ContentWrapper>
				<SectionHeader title='Our Latest blog' />
				<div className='grid grid-cols-4 gap-10 '>
					{all_blog.map((blog, index) => (
						<BlogCard
							author={blog.author}
							createdAt={blog.createdAt}
							blogLink={`/blog/${v4()}${blog.id}`}
							comments={blog.comment!}
							description={blog.summary}
							thumbnilImage={blog.thumbnailImage!}
							title={blog.title}
							key={index}
							imageStyles='w-[100%] h-[200px] md:h-[200px] lg:h-[200px]'
							contentBoxStyles='p-5'
							titleStyles='text-lg md:text-xl'
							createAtStyles='bg-zinc-50 hover:bg-zinc-100 rounded-none text-zinc-700'
							authorBoxStyles='border-0 pb-0'
						/>
					))}
				</div>
			</ContentWrapper>
		</section>
	);
}
