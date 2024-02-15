/** @format */

import Link from 'next/link';
import React from 'react';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';
import { getBlogs } from '@/methods/blog-method';
import Image from 'next/image';
import { v4 } from 'uuid';

export default async function SideMenu() {
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
			<form className='flex flex-row mb-8'>
				<input
					type='text'
					placeholder='search...'
					className='py-2 px-4 outline-none border focus:border-blue-700 transition-all'
				/>
				<button
					type='submit'
					className='py-3 px-4 bg-blue-800 hover:bg-blue-900 transition-all font-bold text-white'>
					Search
				</button>
			</form>
			{/* Recent post */}
			<div className='flex flex-col pb-3'>
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
			<div className='flex flex-col pb-8'>
				<h4 className='text-xl text-zinc-600 mb-5 border-b pb-2'>Categories</h4>
				<ul>
					{keywords.map((keyword, index) => (
						<li key={index}>
							<Link
								href={`/${keyword}`}
								className='flex flex-row text-sm items-center justify-start gap-1'>
								<IconCreator
									icon={IconType.RightArrow}
									className='text-zinc-400'
								/>
								<span className='text-blue-400 capitalize'>{keyword}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
