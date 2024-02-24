/** @format */

'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function DashboardHeader({ className }: { className?: string }) {
	const pathname = usePathname();
	return (
		<div
			className={cn(
				'w-full flex justify-between items-center h-[60px] px-4 bg-zinc-50 shadow-sm',
				className,
			)}>
			<h2 className='font-bold text-blue-900 text-lg flex items-center justify-start gap-2 '>
				{pathname
					.trim()
					.split('/')
					.map((data) => (
						<span key={data} className='capitalize'>
							{data} /
						</span>
					))}
			</h2>
		</div>
	);
}
