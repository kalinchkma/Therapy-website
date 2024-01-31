/** @format */
'use client';

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import ContactLink from './contact-links';
import Summary from './summary';
import CopyRight from './copy-right';
import { IgnoreFooter } from '@/lib/static_data';
import { usePathname } from 'next/navigation';

export default function Footer() {
	const pathname = usePathname();

	return (
		!pathname.startsWith('/dashboard') &&
		!IgnoreFooter.includes(pathname) && (
			<footer className='w-full pt-14 bg-zinc-800'>
				<ContentWrapper className='pb-14'>
					{/* Contact links */}
					<ContactLink />
					{/* divider */}
					<div className='my-14 border-t border-zinc-600 w-full' />
					{/* website summary */}
					<Summary />
				</ContentWrapper>
				{/* Copy write */}
				<CopyRight />
			</footer>
		)
	);
}
