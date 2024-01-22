/** @format */

import React from 'react';
import ActionButton from '../common/action-button';
import { cn } from '@/lib/utils';

interface BannerContentProps {
	className?: string;
	btnTitle: string;
	btnLink: string;
	bannerTitle: string;
	bannerSecondaryTitle: string;
}

export default function BannerContent({
	btnLink,
	btnTitle,
	bannerTitle,
	bannerSecondaryTitle,
	className,
}: BannerContentProps) {
	return (
		<div className={cn('flex flex-col pl-16', className)}>
			<h2 className='uppercase text-sm font-extrabold text-blue-700 tracking-widest'>
				{bannerSecondaryTitle}
			</h2>
			<h1 className='text-2xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-md mb-4'>
				{bannerTitle}
			</h1>
			<div className='inline-flex'>
				<ActionButton title={btnTitle} link={btnLink} />
			</div>
		</div>
	);
}
