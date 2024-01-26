/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import BlogCard from '../common/blog-card';

import { BlogPosts, Keywords } from '@/lib/static_data';
import { Input } from '../ui/input';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';
import Link from 'next/link';

export default function BlogPageComponent() {
	return (
		<div className='w-full'>
			<PageTitle
				title='Blog'
				description='Read all blog know about our services'
			/>
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Blog', url: '/blog' },
				]}
			/>
			<ContentWrapper className='py-16'>
				<div className='grid grid-cols-4 gap-10 md:px-12 lg:px-0'>
					<div className='col-span-4 lg:col-span-3 flex flex-col gap-16'>
						{BlogPosts.map((post, index) => (
							<BlogCard
								key={index}
								author={post.author}
								blogLink=''
								comments={post.comments_count}
								description={post.description}
								thumbnilImage={post.thumbnilImage}
								keywords={post.keywords}
								title={post.title}
								className='col-span-1'
							/>
						))}
					</div>
					{/* blog side menu */}
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
						<div className='flex flex-col pb-8'>
							<h4 className='text-xl text-zinc-600 mb-5'>Recent post</h4>
							<ul>
								{Keywords.map((keyword, index) => (
									<li key={index}>
										<Link
											href={`/${keyword.name}`}
											className='flex flex-row text-sm items-center justify-start gap-1'>
											<IconCreator
												icon={IconType.RightArrow}
												className='text-zinc-400'
											/>
											<span className='text-blue-400 capitalize'>
												{keyword.name}
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
						{/* Categories */}
						<div className='flex flex-col pb-8'>
							<h4 className='text-xl text-zinc-600 mb-5'>Categories</h4>
							<ul>
								{Keywords.map((keyword, index) => (
									<li key={index}>
										<Link
											href={`/${keyword.name}`}
											className='flex flex-row text-sm items-center justify-start gap-1'>
											<IconCreator
												icon={IconType.RightArrow}
												className='text-zinc-400'
											/>
											<span className='text-blue-400 capitalize'>
												{keyword.name}
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</ContentWrapper>
		</div>
	);
}
