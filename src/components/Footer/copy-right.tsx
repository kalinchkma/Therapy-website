/** @format */

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import Link from 'next/link';

export default function CopyRight() {
	return (
		<div className=' w-full py-4 bg-pink-950'>
			<ContentWrapper className='flex'>
				<h6 className='text-zinc-500 flex gap-3'>
					&copy; Copyright 2024{' '}
					<span className='text-zinc-50 font-bold'>
						Universal Physiotherapy & Rehab center
					</span>{' '}
					|
					<p className='flex text-white gap-3'>
						Developed By
						<Link
							href={'https://github.com/kalinchkma'}
							className='font-extrabold italic'>
							Kalin Chakma
						</Link>
					</p>
				</h6>
			</ContentWrapper>
		</div>
	);
}
