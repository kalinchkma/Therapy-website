/** @format */

import React from 'react';
import CreateNewBlog from './create-new-blog';
import { getBlogsForAdmin } from '@/methods/blog-method';
import BlogCard from './blog-card-d';
import SearchBlog from './search-blog';
import { HOST } from '@/lib/static_data';

export default async function BlogPostComponent({
	search,
}: {
	search?: string;
}) {
	const blogs = await getBlogsForAdmin(search);

	return (
		<div className='w-full p-4'>
			<div className='flex gap-3'>
				<CreateNewBlog />
				<SearchBlog />
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
				{blogs.map((blog, index) => (
					<BlogCard
						key={index}
						author={blog.author}
						blogLink={`/blog/${blog.id}`}
						comments={blog.comment!}
						description={blog.summary}
						thumbnilImage={blog.thumbnailImage!}
						title={blog.title}
						keywords={blog.keywords!}
						blog={blog}
						host={HOST!}
					/>
				))}
			</div>
		</div>
	);
}
