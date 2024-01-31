/** @format */

'use client';

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

export default function AdminHeader() {
	const pathname = usePathname();

	return (
		!pathname.startsWith('/dashboard') && (
			<div className='w-full'>
				<ContentWrapper className='py-1 justify-end flex'>
					<Link
						href={'/dashboard'}
						className='py-1 px-4 bg-zinc-100 rounded-md'>
						Dashboard
					</Link>
				</ContentWrapper>
			</div>
		)
	);
}
