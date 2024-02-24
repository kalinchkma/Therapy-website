/** @format */

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import SectionHeader from '../common/section-header';
import { getBlogs } from '@/methods/blog-method';
import BlogCard from '../common/blog-card';
import { v4 } from 'uuid';

type Blog = {
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
	published: boolean | null;
};

export default async function LatestBlog() {
	const all_blog: Blog[] = await getBlogs();
	return (
		all_blog.length > 0 && (
			<section className='w-full py-28'>
				<ContentWrapper>
					<SectionHeader title='Our Latest blog' />
					<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 px-5 md:px-0 '>
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
		)
	);
}
