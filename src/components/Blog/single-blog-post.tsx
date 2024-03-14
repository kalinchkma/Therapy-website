/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import SideMenu from './side-menu';
import Image from 'next/image';
import { ActionButtonStyles } from '../common/action-button';
import { cn } from '@/lib/utils';
import {
	CircleUserRound,
	MessageSquareText,
	SquareUserRound,
	User,
} from 'lucide-react';
import Markdown from 'react-markdown';
import BlogComment from './blog-comment';
import { getCommentsByPostId } from '@/methods/comments-method';
import { getBlogs } from '@/methods/blog-method';
import { v4 } from 'uuid';

type Post = {
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

export default async function SingleBlogPostComponent({
	blog_post,
	host,
}: {
	blog_post: Post;
	host: string;
}) {
	const uploaded_at = new Date(blog_post.createdAt as Date);
	const all_comments = await getCommentsByPostId(blog_post.id);

	const all_blogs = await getBlogs();
	const keywords: string[] = [];

	// filter all keywords
	all_blogs.forEach((blog) => {
		blog.keywords?.split(',').forEach((word) => {
			if (!keywords.includes(word.toLowerCase().trim())) {
				keywords.push(word.toLowerCase().trim());
			}
		});
	});
	return (
		<div className='w-full'>
			<PageTitle
				title={blog_post.title}
				className='text-center py-0'
				bgImageUrl={`${host}${blog_post.thumbnailImage}`}
				overlayStyles='bg-gray-700 py-28 bg-opacity-60'
				titleStyle='text-white'
			/>
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
									src={`${host}${blog_post.thumbnailImage}`}
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
						<Markdown className='content-preview blog-content mb-10'>
							{blog_post.content}
						</Markdown>

						{/* comments of blog */}
						<div className='flex flex-col'>
							{/* section heading */}
							<h4 className='text-2xl mb-8 border-b pb-5'>Comments</h4>
							{/* comments */}
							<div className='flex flex-col max-h-[300px] md:max-h-[400px] gap-5 overflow-y-auto'>
								{all_comments.map((comment, index) => (
									<div
										key={index}
										className='flex flex-col p-8 bg-zinc-100 rounded-3xl'>
										<h5 className='flex items-center justify-start gap-1 text-gray-600 italic text-sm'>
											<SquareUserRound className='h-4 w-4 italic' />{' '}
											<span className=''>{comment.name}</span>
										</h5>
										<p className='py-2 px-5 text-gray-800 text-base'>
											{comment.comment_content}
										</p>
									</div>
								))}

								{/* ---------------- */}
							</div>
						</div>

						{/* public comments */}
						<BlogComment blog_id={blog_post.id} />
					</div>
					{/* side menu */}
					<SideMenu
						location='single'
						keywords={keywords}
						all_blogs={all_blogs}
						host={host}
					/>
				</div>
			</ContentWrapper>
		</div>
	);
}
