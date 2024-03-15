/** @format */

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import Link from 'next/link';

export default function CopyRight({ website_name }: { website_name: string }) {
	return (
		<div className=' w-full py-4 bg-zinc-950'>
			<ContentWrapper className='flex md:flex-row flex-col gap-3'>
				<h6 className='text-zinc-500 flex justify-center items-center gap-3'>
					&copy; Copyright 2024{' '}
					<span className='text-zinc-50 font-bold '>{website_name}</span>{' '}
				</h6>
				<p className='flex items-center justify-center text-white gap-3 border-t border-zinc-700 md:border-0 md:py-0 md:pl-4 md:border-l py-2'>
					Developed By
				</p>
				<div className='flex items-center justify-center flex-wrap gap-3'>
					<Link
						target='_blank'
						href={'https://github.com/kalinchkma'}
						className='font-extrabold italic text-green-500 text-sm'>
						Kalin Chakma
					</Link>{' '}
					<span className='text-white'>|</span>
					<Link
						target='_blank'
						href={'https://github.com/Unified-Tech-Guild'}
						className='font-extrabold italic text-green-500 text-sm'>
						Unified Tech Guild
					</Link>
				</div>
			</ContentWrapper>
		</div>
	);
}
