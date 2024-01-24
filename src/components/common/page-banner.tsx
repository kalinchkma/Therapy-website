/** @format */

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface BannerProps {
	className?: string;
	bgImageUrl?: string;
	children: React.ReactNode;
	overlayStyles?: string;
}

export default function PageBanner({
	className,
	bgImageUrl,
	children,
	overlayStyles,
}: BannerProps) {
	return (
		<div
			className={cn(
				'w-full p-3 bg-fixed bg-top bg-origin-border bg-cover bg-no-repeat h-[50vh] md:h-[75vh]',
				className,
			)}
			style={{ backgroundImage: `url('${bgImageUrl}')` }}>
			<div
				className={cn(
					'container flex h-full items-center justify-start',
					overlayStyles,
				)}>
				{children}
			</div>
		</div>
	);
}
