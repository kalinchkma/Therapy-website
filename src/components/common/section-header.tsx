/** @format */

import { cn } from '@/lib/utils';
import React from 'react';

interface SectionHeaderProps {
	title: string;
	className?: string;
}

export default function SectionHeader({
	title,
	className,
}: SectionHeaderProps) {
	return (
		<h4
			className={cn(
				'flex justify-start items-center text-3xl font-extrabold capitalize tracking-widest text-zinc-600 mb-3',
				className,
			)}>
			{title}
		</h4>
	);
}
