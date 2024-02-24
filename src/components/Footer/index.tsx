/** @format */
'use client';

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import ContactLink from './contact-links';
import Summary from './summary';
import CopyRight from './copy-right';
import { IgnoreFooter } from '@/lib/static_data';
import { usePathname } from 'next/navigation';

export default function Footer({
	informations,
	services,
}: {
	informations: {
		id: number;
		openning_hours: unknown;
		emails: string;
		location: string;
		contact_numbers: string;
		social_links: unknown;
		logo: string;
		website_name: string;
		product_shipping_charge: unknown;
	}[];
	services:
		| false
		| {
				id: number;
				name: string;
				description: string | null;
				price: string | null;
				thumbnailImage: string;
				content: string | null;
				published: number | null;
		  }[];
}) {
	const pathname = usePathname();

	return (
		!pathname.startsWith('/dashboard') &&
		!IgnoreFooter.includes(pathname) && (
			<footer className='w-full pt-14 bg-blue-950'>
				<ContentWrapper className='pb-14'>
					{/* Contact links */}
					{informations.length > 0 && (
						<ContactLink informations={informations} />
					)}
					{/* divider */}
					<div className='my-14 border-t border-blue-900 w-full' />
					{/* website summary */}

					{informations.length > 0 && (
						<Summary informations={informations} services={services} />
					)}
				</ContentWrapper>
				{/* Copy write */}
				{informations.length > 0 && (
					<CopyRight website_name={informations[0].website_name} />
				)}
			</footer>
		)
	);
}
