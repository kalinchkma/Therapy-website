/** @format */

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

export default function MoreBtn({
	link,
	title,
	className,
}: {
	link: string;
	title: string;
	className?: string;
}) {
	return (
		<Link
			href={link}
			className={cn(
				'inline-flex gap-2 hover:gap-1 transition-all mt-2 font-bold text-blue-400 items-center justify-center',
				className,
			)}>
			{title} <IoIosArrowForward />
		</Link>
	);
}
