/** @format */

import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ServiceType } from '@/lib/definitions';

import { cn } from '@/lib/utils';
import MoreBtn from './more-btn';

interface ServiceCardProps extends ServiceType {
	className?: string;
}

export function ServiceCard({
	title,
	description,
	thumbnailImage,
	serviceLink,
	className,
}: ServiceCardProps) {
	return (
		<div
			className={cn(
				'w-full flex flex-col justify-start items-start',
				className,
			)}>
			{/* Service Image */}
			<div className='w-full relative'>
				<Image
					src={thumbnailImage}
					alt='service image'
					width={300}
					height={300}
					className='max-w-full rounded-sm md:h-[300px] md:w-[300px] lg:h-[300px] lg:w-[400px] object-cover'
				/>
				<div className='absolute top-0 left-0 flex items-center justify-center md:w-[300px] md:h-[300px] lg:w-full lg:h-full bg-zinc-800 bg-opacity-60 hover:opacity-100 opacity-0 transition-opacity'>
					<Link
						href={serviceLink}
						className='bg-zinc-900 bg-opacity-90 text-zinc-100 transition-all hover:bg-purple-900 font-bold py-2 px-4 rounded-3xl'>
						আরও দেখুন
					</Link>
				</div>
			</div>
			{/* Service Title */}
			<Link href={''} className='capitalize font-bold text-zinc-800 my-4'>
				{title}
			</Link>
			{/* Service description */}

			<p className='text-base text-zinc-500 text-ellipsis line-clamp-5'>
				{description}
			</p>

			<MoreBtn link={serviceLink} title='আরও দেখুন' />
		</div>
	);
}
