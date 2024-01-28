/** @format */

'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function DashboardHeader() {
	const pathname = usePathname();
	return (
		<div className='w-full flex justify-between items-center h-[60px] px-4 bg-zinc-50'>
			<h2 className='font-bold text-blue-900 text-lg flex items-center justify-start gap-2 '>
				{pathname
					.trim()
					.split('/')
					.map((data) => (
						<span key={data} className='capitalize'>
							{data} /
						</span>
					))}
			</h2>
			<div className='inline-flex items-center justify-center'>
				<Image
					src={'/images/slide1.jpg'}
					width={'40'}
					height={'40'}
					alt='image'
					className='min-w-[40px] min-h-[40px] object-cover rounded-full border-2 border-blue-600 cursor-pointer'
					title='Hunter'
				/>
			</div>
		</div>
	);
}
