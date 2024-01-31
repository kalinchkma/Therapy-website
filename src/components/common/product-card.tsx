/** @format */

import Image from 'next/image';
import React from 'react';
import IconCreator from './icon-creator';
import { IconType } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import ActionButton from './action-button';

interface ProductCardProps {
	className?: string;
}

export default function ProductCard({ className }: ProductCardProps) {
	return (
		<div
			className={cn(
				'flex items-start justify-center flex-col w-full',
				className,
			)}>
			<Image
				src={'/images/service1.jpg'}
				width={400}
				height={400}
				alt='product image'
				className='min-w-[100%] min-h-[200px] object-cover border-2 border-transparent transition-all hover:border-blue-400'
			/>
			{/* product title */}
			<h4 className='text-xl text-zinc-700 font-bold mt-4 mb-2'>
				Medical Tape
			</h4>
			{/* product rate */}
			<div className='flex flex-row text-yellow-400'>
				<IconCreator icon={IconType.Star} />
				<IconCreator icon={IconType.Star} />
				<IconCreator icon={IconType.Star} />
				<IconCreator icon={IconType.Star} />
			</div>
			{/* price */}
			<h5 className='text-zinc-500 font-bold text-lg my-1'>$1200</h5>
			{/* order button */}
			<div className='flex items-center justify-center w-full'>
				<ActionButton link='/' title='Order now' className='text-sm' />
			</div>
		</div>
	);
}
