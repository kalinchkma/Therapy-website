/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import BlogCard from '../common/blog-card';
import SideMenu from './side-menu';
import { v4 } from 'uuid';

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

export default function AllBlogPost({
	posts,
	uid,
	all_blog_key,
	host,
}: {
	posts: Post[];
	all_blog_key: Post[];
	uid: string;
	host: string;
}) {
	const [all_blog, setAll_blog] = useState<Post[]>([]);
	const [searchKey, setSearchKey] = useState<string | undefined>();

	useEffect(() => {
		const fetcth_post = async (s: string) => {
			try {
				const all_blog = await fetch(`${host}/api/blog`, {
					method: 'POST',
					body: JSON.stringify({ keyword: s }),
				});
				const res = await all_blog.json();
				setAll_blog(res);
			} catch (error) {
				console.log('Client Error');
			}
		};

		fetcth_post(searchKey!);
	}, [searchKey, host]);

	const keywords: string[] = [];
	// filter all keywords
	all_blog_key.forEach((blog) => {
		blog.keywords?.split(',').forEach((word) => {
			if (!keywords.includes(word.toLowerCase().trim())) {
				keywords.push(word.toLowerCase().trim());
			}
		});
	});

	return (
		<>
			<div className='col-span-4 lg:col-span-3 flex flex-col gap-16'>
				{searchKey ? (
					all_blog.length > 0 ? (
						all_blog.map((blog, index) => (
							<BlogCard
								key={index}
								author={blog.author}
								blogLink={`/blog/${uid}${blog.id}`}
								comments={blog.comment!}
								description={blog.summary}
								thumbnilImage={blog.thumbnailImage!}
								keywords={blog.keywords!}
								title={blog.title}
								createdAt={blog.createdAt}
								className='col-span-1'
							/>
						))
					) : (
						<div className='w-full h-full flex items-start justify-center'>
							<h4>No Blog post found!</h4>
						</div>
					)
				) : posts.length > 0 ? (
					posts.map((blog, index) => (
						<BlogCard
							key={index}
							author={blog.author}
							blogLink={`/blog/${uid}${blog.id}`}
							comments={blog.comment!}
							description={blog.summary}
							thumbnilImage={blog.thumbnailImage!}
							keywords={blog.keywords!}
							title={blog.title}
							createdAt={blog.createdAt}
							className='col-span-1'
						/>
					))
				) : (
					<div className='w-full h-full flex items-start justify-center'>
						<h4>No Blog post found!</h4>
					</div>
				)}

				{/* {posts.length <= 0 ||
					(all_blog.length <= 0 && (
						<div className='w-full h-full flex items-start justify-center'>
							<h4>No Blog post found!</h4>
						</div>
					))} */}
			</div>
			{/* side menu */}
			<SideMenu
				location='multiple'
				keywords={keywords}
				all_blogs={all_blog_key}
				uid={v4()}
				setSearchKey={setSearchKey}
			/>
		</>
	);
}
