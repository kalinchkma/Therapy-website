/** @format */

import React from 'react';
import CreateNewBlog from './create-new-blog';
import { getBlogs } from '@/methods/blog-method';
import BlogCard from './blog-card';

export default async function BlogPostComponent() {
	const blogs = await getBlogs();
	return (
		<div className='w-full p-4'>
			<CreateNewBlog />
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
				{blogs.map((blog, index) => (
					<BlogCard
						key={index}
						author={blog.author}
						blogLink={`/blog/${blog.id}`}
						comments={0}
						description={blog.summary}
						thumbnilImage={blog.thumbnailImage!}
						title={blog.title}
						keywords={blog.keywords!}
					/>
				))}
			</div>
		</div>
	);
}
