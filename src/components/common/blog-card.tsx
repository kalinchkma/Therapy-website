/** @format */

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import ActionButton from './action-button';
import Link from 'next/link';
import MoreBtn from './more-btn';

interface BlogCardProps {
	title: string;
	className?: string;
	thumbnilImage: string;
	blogLink: string;
	keywords?: string[];
	author: string;
	description: string;
	comments: number;
}

export default function BlogCard({
	className,
	author,
	blogLink,
	comments,
	description,
	thumbnilImage,
	keywords,
	title,
}: BlogCardProps) {
	return (
		<div className={cn('w-full border rounded-sm', className)}>
			<div className='w-full relative'>
				<Image
					src={thumbnilImage}
					width={600}
					height={600}
					alt='blog image'
					className='min-w-[100%] min-h-[350px] md:min-h-[400px] lg:min-h-[450px] object-cover'
				/>
				{/* button with uploaded data */}
				<ActionButton
					link={blogLink}
					title='August 7, 2022'
					className='absolute bottom-10 left-12 capitalize'
				/>
			</div>
			<div className='p-12'>
				<h4 className='flex flex-row gap-4 text-zinc-400 font-bold'>
					{/* author name */}
					<span className='text-zinc-500'>{author}</span> / {/* Comments */}
					<span className='text-zinc-500'>{comments} comment</span> /{' '}
					{/* keywords */}
					<span className='text-zinc-500'>
						{keywords?.map((keyword) => (
							<span key={keyword}> {keyword}</span>
						))}
					</span>
				</h4>
				<Link
					href={'/'}
					className='font-bold text-zinc-600 text-3xl hover:text-blue-400 transition-all py-6 flex'>
					{title}
				</Link>
				<p className='line-clamp-3 text-base text-zinc-500'>{description}</p>

				<MoreBtn link='/' title='Read more' />
			</div>
		</div>
	);
}
