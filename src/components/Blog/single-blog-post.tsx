/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import SideMenu from './side-menu';
import Image from 'next/image';
import { ActionButtonStyles } from '../common/action-button';
import { cn } from '@/lib/utils';
import { MessageSquareText, User } from 'lucide-react';
import Markdown from 'react-markdown';

export default function SingleBlogPostComponent({
	blog_post,
}: {
	blog_post: {
		summary: string;
		title: string;
		id: number;
		createdAt: Date | null;
		updatedAt: Date | null;
		thumbnailImage: string | null;
		content: string | null;
		author: string;
		comment: number | null;
		keywords: string | null;
	};
}) {
	const uploaded_at = new Date(blog_post.createdAt as Date);
	return (
		<div className='w-full'>
			<PageTitle title={blog_post.title} />
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Blog', url: '/blog' },
					{ name: blog_post.title },
				]}
			/>
			<ContentWrapper className='py-16'>
				<div className='grid grid-cols-4 gap-10 md:px-12 lg:px-0'>
					{/* blog details */}
					<div className='col-span-4 lg:col-span-3 flex flex-col'>
						{/* thumbnail image and created at */}
						<div className='w-full relative'>
							<div className='flex items-center justify-center w-full'>
								<Image
									src={blog_post.thumbnailImage!}
									width={400}
									height={350}
									alt='blog image'
									className='min-w-[100%] min-h-[200px] md:min-h-[340px] lg:min-h-[350px] object-cover'
								/>
							</div>
							<span
								className={cn(
									ActionButtonStyles,
									'absolute bottom-10 left-12 capitalize',
								)}>
								{uploaded_at.toISOString()}
							</span>
						</div>
						{/* author, comments and title */}
						<div className='w-full mt-10'>
							<h4 className='w-full flex text-sm md:text-base flex-row gap-4 text-zinc-400 font-bold border-b pb-7'>
								{/* author name */}
								<span className='text-zinc-500 flex items-end gap-2'>
									<User /> {blog_post.author}
								</span>{' '}
								{/* Comments */}
								<span className='text-zinc-500 flex items-end gap-2 text-base'>
									<MessageSquareText /> {blog_post.comment} comment
								</span>
							</h4>
							{/* keywords */}
							<h4 className='text-zinc-500 mt-5'>
								Keywords:{' '}
								<span className='text-zinc-950 italic font-bold capitalize'>
									{blog_post.keywords}
								</span>
							</h4>
							{/* blog title */}
							<h3 className='font-bold  text-xl md:text-4xl text-blue-400 transition-all py-6 flex'>
								{blog_post.title}
							</h3>
						</div>
						{/* blog contents */}
						<Markdown className='content-preview'>{blog_post.content}</Markdown>
					</div>
					{/* side menu */}
					<SideMenu />
				</div>
			</ContentWrapper>
		</div>
	);
}
