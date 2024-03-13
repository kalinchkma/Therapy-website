/** @format */

import Link from 'next/link';
import React from 'react';
import { SocialLinks } from '@/lib/static_data';
import SocialLinkCreator from '../common/social-link';
import { cn } from '@/lib/utils';
import { MdOutlineContactPhone } from 'react-icons/md';
import { IoMdTimer } from 'react-icons/io';

import ContentWrapper from '../common/content-wrapper';
import { PhoneCall } from 'lucide-react';

export default function TopHeader({
	className,
	auth,
	informations,
}: {
	className?: string;
	auth?: boolean;
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
}) {
	const contact_numbers = informations[0].contact_numbers.split(',');
	return (
		<nav className='bg-blue-900 py-1 w-full text-white'>
			<ContentWrapper
				className={cn(
					'flex flex-col md:flex-row items-center justify-center gap-2 md:justify-between py-2 ',
					className,
				)}>
				<div className='flex gap-4 items-center justify-center flex-wrap '>
					<ul className='flex flex-col sm:flex-row items-center justify-end gap-4'>
						{contact_numbers.map((contact, index) => (
							<li key={index}>
								<Link href={''} className='flex items-center gap-2'>
									<PhoneCall className='rotate-12 h-5 w-5' />
									<span>{contact}</span>
								</Link>
							</li>
						))}
						<li>
							<Link href={''} className='flex items-center gap-2'>
								<IoMdTimer className='h-5 w-5' />
								<span>Sat-Fri: 9:00AM-12PM</span>
							</Link>
						</li>
					</ul>
				</div>
				<div className='flex gap-3'>
					<div className='flex'>
						<ul className='flex items-center justify-end gap-4'>
							{SocialLinks.map((link) => (
								<li key={link.title}>
									<SocialLinkCreator
										icon={link.icon}
										link={link.link}
										className='font-bold text-xl text-white'
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</ContentWrapper>
		</nav>
	);
}
