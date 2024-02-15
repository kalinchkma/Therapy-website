/** @format */

import React from 'react';
import SingleBlogPostComponent from '@/components/Blog/single-blog-post';
import { Metadata } from 'next';
import { getBlogById, getBlogs } from '@/methods/blog-method';

type Props = {
	params: { id: string };
};

// meta data generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.id[params.id.length - 1];
	const blog_by_id = await getBlogById(Number(id));
	return {
		title: blog_by_id.title,
	};
}

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

export default async function SingleBlogPost({ params }: Props) {
	const id = params.id[params.id.length - 1];
	const blog_by_id = await getBlogById(Number(id));

	return (
		<div className='w-full'>
			<SingleBlogPostComponent blog_post={blog_by_id} />
		</div>
	);
}
