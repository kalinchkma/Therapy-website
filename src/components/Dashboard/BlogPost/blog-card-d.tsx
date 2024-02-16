/**
 *
 * @format
 */

/** @format */

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ActionButtonStyles } from '@/components/common/action-button';
import { Button } from '@/components/ui/button';
import UpdateBlog from './update-blog';
import { deleteBlogPost, publishBlogPost } from '@/actions/blog-actions';
import BlogComments from './blog-comments';
import { getCommentsByPostId } from '@/methods/comments-method';

interface BlogCardProps {
	title: string;
	className?: string;
	thumbnilImage: string;
	blogLink?: string;
	keywords?: string;
	author: string;
	description: string;
	comments?: number;
	blog: {
		author: string;
		keywords: string | null;
		title: string;
		summary: string;
		id: number;
		content: string | null;
		createdAt: Date | null;
		updatedAt: Date | null;
		thumbnailImage: string | null;
		comment: number | null;
		published: boolean | null;
	};
	host: string;
}

export type Comment = {
	id: number;
	name: string;
	email: string;
	createdAt: Date | null;
	updatedAt: Date | null;
	comment_content: string;
	blog_id: number;
};

export default async function BlogCard({
	className,
	author,
	blogLink,
	comments,
	description,
	thumbnilImage,
	keywords,
	title,
	blog,
	host,
}: BlogCardProps) {
	const date = new Date(blog.createdAt as Date);
	const delete_blog = deleteBlogPost.bind(null, blog.id);
	const blog_comments = await getCommentsByPostId(blog.id);
	const change_visivility_of_blog = publishBlogPost.bind(null, blog.id);
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
						' flex text-wrap bg-purple-800 hover:bg-purple-900 transition-colors py-3 px-5 rounded-3xl text-white font-bold text-sm absolute bottom-5 left-7 capitalize',
					)}>
					{date.toISOString()}
				</span>
			</div>
			<div className='p-6'>
				<h4 className='w-full flex text-sm md:text-base flex-row gap-4 text-zinc-400 font-bold pb-2'>
					{/* author name */}
					<span className='text-zinc-500'>{author}</span> / {/* Comments */}
					<BlogComments comments={blog_comments} />
				</h4>
				<div className='flex flex-wrap text-zinc-500 italic border-b pb-5'>
					<span className='pr-3'>Keywords:</span>
					{/* keywords */}
					{keywords?.split(',').map((keyword) => (
						<span key={keyword} className='mr-2'>
							{keyword}
						</span>
					))}
				</div>
				<h4 className='font-bold text-zinc-600 text-lg md:text-3xl  transition-all py-2 flex'>
					{title}
				</h4>
				<p className='line-clamp-3 text-base text-zinc-500'>{description}</p>
			</div>
			{/* pbulish and unpbulish blog */}
			<form
				action={change_visivility_of_blog}
				className='flex flex-col items-center justify-center'>
				<p className='w-full py-2 bg-green-200 mb-3 text-center'>
					{blog.published ? 'Public' : 'Private'}
				</p>
				<Button type='submit' variant='outline'>
					{blog.published ? 'Make Private' : 'Make Public'}
				</Button>
			</form>
			<div className='flex flex-wrap w-full items-center justify-center py-6 gap-4'>
				<UpdateBlog blog={blog!} />
				<form action={delete_blog}>
					<Button type='submit' variant='destructive'>
						Delete
					</Button>
				</form>
			</div>
		</div>
	);
}
