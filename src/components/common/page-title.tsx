/** @format */

import React from 'react';
import PageBanner from './page-banner';
import ContentWrapper from './content-wrapper';
import { cn } from '@/lib/utils';

interface PageTitleProps {
	bgImageUrl?: string;
	overlayStyles?: string;
	className?: string;
	title?: string;
	description?: string;
	name?: string;
	titleStyle?: string;
}

export default function PageTitle({
	title,
	name,
	description,
	bgImageUrl,
	className,
	overlayStyles,
	titleStyle,
}: PageTitleProps) {
	return (
		<PageBanner
			className={cn('w-full py-14 bg-zinc-100', className)}
			bgImageUrl={bgImageUrl}
			overlayStyles={overlayStyles}>
			<ContentWrapper>
				{title && (
					<h1 className={cn('font-bold text-4xl text-zinc-800', titleStyle)}>
						{title}
					</h1>
				)}
				{name && (
					<h1 className=' text-3xl text-zinc-600 flex items-center justify-start flex-wrap gap-3'>
						Welcome Back
						<span className='text-blue-400 text-4xl font-bold'>{name}</span>
					</h1>
				)}
				<p className='text-zinc-400 text-lg'>{description}</p>
			</ContentWrapper>
		</PageBanner>
	);
}
