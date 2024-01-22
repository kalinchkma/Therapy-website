/** @format */

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface BannerProps {
	className?: string;
	bgImageUrl?: string;
	children: React.ReactNode;
}

export default function PageBanner({
	className,
	bgImageUrl,
	children,
}: BannerProps) {
	return (
		<div
			className={cn(
				'w-full p-3 bg-fixed bg-center bg-origin-border bg-cover bg-no-repeat h-[80vh]',
				className,
			)}
			style={{ backgroundImage: `url('${bgImageUrl}')` }}>
			<div className='container'>{children}</div>
		</div>
	);
}
