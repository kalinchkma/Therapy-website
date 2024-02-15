/** @format */

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import ActionButton from './action-button';
import Link from 'next/link';
import MoreBtn from './more-btn';
import IconCreator from './icon-creator';
import { IconType } from '@/lib/definitions';
import { BsPeople } from 'react-icons/bs';
import {
	CircleUser,
	MessageSquareText,
	SquareUserRound,
	User,
} from 'lucide-react';

interface BlogCardProps {
	title: string;
	className?: string;
	thumbnilImage: string;
	blogLink: string;
	keywords?: string;
	author: string;
	description: string;
	comments: number;
	createdAt: Date | null;
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
	createdAt,
}: BlogCardProps) {
	const created_time = new Date(createdAt as Date);

	return (
		<div className={cn('w-full border rounded-sm', className)}>
			<div className='w-full relative'>
				<Link
					href={blogLink}
					className='flex items-center justify-center w-full'>
					<Image
						src={thumbnilImage}
						width={600}
						height={600}
						alt='blog image'
						className='min-w-[100%] min-h-[350px] md:min-h-[400px] lg:min-h-[450px] object-cover'
					/>
				</Link>
				{/* button with uploaded data */}
				<ActionButton
					link={blogLink}
					title={created_time.toUTCString()}
					className='absolute bottom-10 left-12 capitalize'
				/>
			</div>
			<div className='p-12'>
				<h4 className='w-full flex text-sm md:text-base flex-row gap-4 text-zinc-400 font-bold border-b pb-7'>
					{/* author name */}
					<span className='text-zinc-500 flex items-end gap-2'>
						<User /> {author}
					</span>{' '}
					{/* Comments */}
					<span className='text-zinc-500 flex items-end gap-2 text-base'>
						<MessageSquareText /> {comments} comment
					</span>
				</h4>
				{/* keywords */}
				<h4 className='text-zinc-500 mt-5'>
					Keywords:{' '}
					<span className='text-zinc-950 italic font-bold capitalize'>
						{keywords}
					</span>
				</h4>
				<Link
					href={blogLink}
					className='font-bold text-zinc-600 text-xl md:text-3xl hover:text-blue-400 transition-all py-6 flex'>
					{title}
				</Link>
				<p className='line-clamp-3 text-base text-zinc-500'>{description}</p>

				<MoreBtn link={blogLink} title='Read more' />
			</div>
		</div>
	);
}
