/** @format */

import Image from 'next/image';
import React from 'react';

export default function ProductCard() {
	return (
		<div className='col-span-1'>
			<Image
				src={'/images/service1.jpg'}
				width={400}
				height={400}
				alt='product image'
				className='min-w-[100%] min-h-[200px] object-cover border-2 border-transparent transition-all hover:border-blue-400'
			/>
			{/* product title */}
			<h4 className='text-xl text-zinc-700 font-bold'>Medical Tape</h4>
			{/* product rate */}
			<span></span>
		</div>
	);
}
