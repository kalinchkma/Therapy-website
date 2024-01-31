/** @format */

'use client';

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

export default function ClientHeader() {
	const pathname = usePathname();

	return (
		!pathname.startsWith('/dashboard') &&
		!pathname.startsWith('/profile') && (
			<div className='w-full'>
				<ContentWrapper className='py-1 justify-end flex'>
					<Link
						href={'/profile'}
						className='py-1 px-4 text-white hover:text-blue-600 bg-purple-400  rounded-md'>
						Profile
					</Link>
				</ContentWrapper>
			</div>
		)
	);
}
