/** @format */

import { cn } from '@/lib/utils';
import React from 'react';

export default function ContentWrapper({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn('container px-5 md:px-8 lg:px-16 xl:px-20', className)}>
			{children}
		</div>
	);
}
