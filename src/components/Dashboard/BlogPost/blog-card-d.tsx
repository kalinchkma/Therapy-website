/** @format */

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import ActionButton, {
	ActionButtonStyles,
} from '@/components/common/action-button';
import Link from 'next/link';
import MoreBtn from '@/components/common/more-btn';
import { Button } from '@/components/ui/button';

interface BlogCardProps {
	title: string;
	className?: string;
	thumbnilImage: string;
	blogLink: string;
	keywords?: string;
	author: string;
	description: string;
	comments?: number;
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
				<div className='flex items-center justify-center w-full'>
					<Image
						src={thumbnilImage}
						width={300}
						height={300}
						alt='blog image'
						className='min-w-[100%] min-h-[250px] md:min-h-[270px] lg:min-h-[300px] object-cover'
					/>
				</div>
				{/* button with uploaded data */}
				<span
					className={cn(
						ActionButtonStyles,
						'absolute bottom-10 left-12 capitalize',
					)}>
					2 Aug
				</span>
			</div>
			<div className='p-12'>
				<h4 className='w-full flex text-sm md:text-base flex-row gap-4 text-zinc-400 font-boldpb-7'>
					{/* author name */}
					<span className='text-zinc-500'>{author}</span> / {/* Comments */}
					<span className='text-zinc-500'>{comments} comment</span> /{' '}
				</h4>
				<div className='flex flex-wrap text-zinc-500 italic border-b pb-10'>
					<span className='pr-3'>Keywords:</span>
					{/* keywords */}
					{keywords?.split(',').map((keyword) => (
						<span key={keyword} className='mr-2'>
							{keyword}
						</span>
					))}
				</div>
				<h4 className='font-bold text-zinc-600 text-xl md:text-3xl hover:text-blue-400 transition-all py-6 flex'>
					{title}
				</h4>
				<p className='line-clamp-3 text-base text-zinc-500'>{description}</p>
			</div>
			<div className='flex w-full items-center justify-center py-6 gap-4'>
				<Button>Edit</Button>
				<Button variant='destructive'>Delete</Button>
			</div>
		</div>
	);
}
