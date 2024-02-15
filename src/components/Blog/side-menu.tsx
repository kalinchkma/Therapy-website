/** @format */

import Link from 'next/link';
import React from 'react';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';
import { getBlogs } from '@/methods/blog-method';
import Image from 'next/image';
import { v4 } from 'uuid';
import BlogSearch from './blog-search';

export default async function SideMenu({ location }: { location: string }) {
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
		<div className='col-span-4 lg:col-span-1'>
			{/* Search form */}
			{!(location === 'single') && <BlogSearch />}

			{/* Recent post */}
			<div className='flex flex-col pb-10'>
				<h4 className='text-xl text-zinc-600 mb-5 border-b pb-2'>
					Recent post
				</h4>
				<ul className='flex flex-col gap-4'>
					<li>
						<Link
							href={`/blog/${v4()}${all_blogs[0].id}`}
							className='flex items-start justify-start gap-2 hover:opacity-90'>
							<Image
								src={all_blogs[0].thumbnailImage!}
								width={50}
								height={50}
								alt='blog-image'
								className='rounded-xl min-h-[50px] min-w-[50px] object-cover'
							/>
							<h4 className='p-0 m-0 text-blue-400 line-clamp-2'>
								{all_blogs[0].title}
							</h4>
						</Link>
					</li>
					<li>
						<Link
							href={`/blog/${v4()}${all_blogs[1].id}`}
							className='flex items-start justify-start gap-2 hover:opacity-90'>
							<Image
								src={all_blogs[1].thumbnailImage!}
								width={50}
								height={50}
								alt='blog-image'
								className='rounded-xl min-h-[50px] min-w-[50px] object-cover'
							/>
							<h4 className='p-0 m-0 text-blue-400 line-clamp-2'>
								{all_blogs[1].title}
							</h4>
						</Link>
					</li>
					<li>
						<Link
							href={`/blog/${v4()}${all_blogs[2].id}`}
							className='flex items-start justify-start gap-2 hover:opacity-90'>
							<Image
								src={all_blogs[2].thumbnailImage!}
								width={50}
								height={50}
								alt='blog-image'
								className='rounded-xl min-h-[50px] min-w-[50px] object-cover'
							/>
							<h4 className='p-0 m-0 text-blue-400 line-clamp-2'>
								{all_blogs[2].title}
							</h4>
						</Link>
					</li>
				</ul>
			</div>

			{/* Categories */}
			<div className='flex flex-col pb-10'>
				<h4 className='text-xl text-zinc-600 mb-5 border-b pb-2'>Categories</h4>
				<ul className='flex flex-col gap-2 '>
					{keywords.map((keyword, index) => (
						<li key={index}>
							<Link
								href={`/blog/?key=${keyword}`}
								className='flex flex-row text-sm items-center justify-start gap-1 text-zinc-700 font-bold hover:text-blue-400'>
								<IconCreator
									icon={IconType.RightArrow}
									className='text-zinc-400'
								/>
								<span className=' capitalize text-lg'>{keyword}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
