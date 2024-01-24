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
		<div className={cn('w-full px-5 md:px-10 lg:px-16', className)}>
			{children}
		</div>
	);
}
