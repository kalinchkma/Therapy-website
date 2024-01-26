/** @format */

import React from 'react';
import PageBanner from './page-banner';
import ContentWrapper from './content-wrapper';
import { cn } from '@/lib/utils';

interface PageTitleProps {
	bgImageUrl?: string;
	overlayStyles?: string;
	className?: string;
	title: string;
	description?: string;
}

export default function PageTitle({
	title,
	description,
	bgImageUrl,
	className,
	overlayStyles,
}: PageTitleProps) {
	return (
		<PageBanner
			className={cn('w-full py-14 bg-zinc-100', className)}
			bgImageUrl={bgImageUrl}
			overlayStyles={overlayStyles}>
			<ContentWrapper>
				<h1 className='font-bold text-4xl text-zinc-600'>{title}</h1>
				<p className='text-zinc-400 text-lg'>{description}</p>
			</ContentWrapper>
		</PageBanner>
	);
}
