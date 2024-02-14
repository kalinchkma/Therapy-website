/** @format */

import React from 'react';
import SingleBlogPostComponent from '@/components/Blog/single-blog-post';
import { Metadata } from 'next';

type Props = {
	params: { id: string };
};

// meta data generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	return {
		title: params.id,
	};
}

export default function SingleBlogPost({ params }: Props) {
	return (
		<div className='w-full'>
			<SingleBlogPostComponent />
		</div>
	);
}
