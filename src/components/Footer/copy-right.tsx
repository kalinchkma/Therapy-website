/** @format */

import React from 'react';
import ContentWrapper from '../common/content-wrapper';

export default function CopyRight() {
	return (
		<div className=' w-full py-4 bg-zinc-900'>
			<ContentWrapper className='flex'>
				<h6 className='text-zinc-500'>
					&copy; Copyright 2024{' '}
					<span className='text-zinc-50 font-bold'>
						Universal Physiotherapy & Rehab center
					</span>
				</h6>
			</ContentWrapper>
		</div>
	);
}
