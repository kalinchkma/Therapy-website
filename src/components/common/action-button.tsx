/** @format */

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
	className?: string;
	link: string;
	title: string;
}

export default function ActionButton({
	className,
	link,
	title,
}: ActionButtonProps) {
	return (
		<Link
			href={link}
			className={cn(
				'flex text-wrap ml-4 bg-purple-800 hover:bg-purple-900 transition-colors py-3 px-5 rounded-3xl text-white font-bold text-sm',
				className,
			)}>
			{title}
		</Link>
	);
}
