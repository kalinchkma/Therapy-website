/** @format */

import BlogPageComponent from '@/components/Blog';
import { getBlogs } from '@/methods/blog-method';
import React, { Suspense } from 'react';

type Props = {
	searchParams: {
		key: string;
	};
};

export default async function BlogPage({ searchParams }: Props) {
	const all_blog = await getBlogs(searchParams.key);
	return (
		<div className='w-full'>
			<BlogPageComponent all_blog={all_blog} />
		</div>
	);
}
