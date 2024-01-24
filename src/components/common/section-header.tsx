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
				'flex justify-start items-center text-3xl font-bold capitalize tracking-widest text-zinc-700 mb-8',
				className,
			)}>
			{title}
		</h4>
	);
}
