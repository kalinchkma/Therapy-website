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
import SocialLinkCreator2 from '../common/social-link-2';

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

	const social_links = JSON.parse(String(informations[0].social_links)) as {
		Facebook?: string;
		Instagram?: string;
		Twitter?: string;
		LinkedIn?: string;
		YouTube?: string;
	};

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
							{social_links.Facebook && (
								<li>
									<SocialLinkCreator2
										title='facebook'
										link={social_links.Facebook}
										className='text-zinc-200 text-3xl hover:text-zinc-100 transition-colors'
									/>
								</li>
							)}
							{social_links.Instagram && (
								<li>
									<SocialLinkCreator2
										title='instagram'
										link={social_links.Instagram}
										className='text-zinc-200 text-3xl hover:text-zinc-100 transition-colors'
									/>
								</li>
							)}
							{social_links.LinkedIn && (
								<li>
									<SocialLinkCreator2
										title='linkedin'
										link={social_links.LinkedIn}
										className='text-zinc-200 text-3xl hover:text-zinc-100 transition-colors'
									/>
								</li>
							)}
							{social_links.Twitter && (
								<li>
									<SocialLinkCreator2
										title='Twitter'
										link={social_links.Twitter}
										className='text-zinc-200 text-3xl hover:text-zinc-100 transition-colors'
									/>
								</li>
							)}
							{social_links.YouTube && (
								<li>
									<SocialLinkCreator2
										title='youtube'
										link={social_links.YouTube}
										className='text-zinc-200 text-3xl hover:text-zinc-100 transition-colors'
									/>
								</li>
							)}
						</ul>
					</div>
				</div>
			</ContentWrapper>
		</nav>
	);
}
