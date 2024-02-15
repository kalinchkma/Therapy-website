/** @format */

import BlogPostComponent from '@/components/Dashboard/BlogPost';
import React from 'react';

export default function BlogPostPage({
	searchParams,
}: {
	searchParams: {
		blog?: string;
	};
}) {
	return (
		<div className='w-full'>
			<BlogPostComponent search={searchParams.blog} />
		</div>
	);
}
