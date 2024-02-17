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
	author?: string;
	description?: string;
	comments?: number;
	createdAt?: Date | null;
	imageStyles?: string;
	contentBoxStyles?: string;
	titleStyles?: string;
	createAtStyles?: string;
	authorBoxStyles?: string;
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
	imageStyles,
	contentBoxStyles,
	titleStyles,
	createAtStyles,
	authorBoxStyles,
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
						height={500}
						alt='blog image'
						className={cn(
							'min-w-[100%] h-[350px] md:h-[400px] lg:h-[450px] object-cover',
							imageStyles,
						)}
					/>
				</Link>
				{/* button with uploaded data */}
				<ActionButton
					link={blogLink}
					title={created_time.toUTCString()}
					className={cn('absolute bottom-5 left-5 capitalize', createAtStyles)}
				/>
			</div>
			<div className={cn('p-12', contentBoxStyles)}>
				<h4
					className={cn(
						'w-full flex text-sm md:text-base flex-row gap-4 text-zinc-400 font-bold border-b pb-7',
						authorBoxStyles,
					)}>
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
				{keywords && (
					<h4 className='text-zinc-500 mt-5'>
						Keywords:{' '}
						<span className='text-zinc-950 italic font-bold capitalize'>
							{keywords}
						</span>
					</h4>
				)}
				<Link
					href={blogLink}
					className={cn(
						'font-bold text-zinc-600 text-xl md:text-3xl hover:text-blue-400 transition-all py-6 flex',
						titleStyles,
					)}>
					{title}
				</Link>
				<p className='line-clamp-3 text-base text-zinc-500'>{description}</p>

				<MoreBtn link={blogLink} title='আরও দেখুন' />
			</div>
		</div>
	);
}
