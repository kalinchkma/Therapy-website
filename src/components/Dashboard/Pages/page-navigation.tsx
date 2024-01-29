/** @format */

'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { NavigationLinks } from '@/lib/static_data';

export default function PageNavigation() {
	const pathname = usePathname();

	return (
		<ul className='flex flex-wrap w-full justify-start items-center'>
			{NavigationLinks.map((nav, index) => (
				<li key={index}>
					<Link
						href={nav.dashboardPath!}
						className={cn(
							'text-zinc-700 text-base px-4 py-2  flex rounded-lg',
							pathname === nav.dashboardPath && 'bg-zinc-200',
						)}>
						{nav.name}
					</Link>
				</li>
			))}
		</ul>
	);
}
