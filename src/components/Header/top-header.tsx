/** @format */

import Link from 'next/link';
import React from 'react';
import { SocialLinks } from '@/lib/static_data';
import SocialLinkCreator from '../common/social-link';
import { cn } from '@/lib/utils';
import { MdOutlineContactPhone } from 'react-icons/md';
import { IoMdTimer } from 'react-icons/io';

import ContentWrapper from '../common/content-wrapper';

export default function TopHeader({
	className,
	auth,
}: {
	className?: string;
	auth?: boolean;
}) {
	return (
		<nav className='bg-pink-900 w-full text-white'>
			<ContentWrapper
				className={cn(
					'flex container flex-col md:flex-row items-center justify-center gap-2 md:justify-between py-2 ',
					className,
				)}>
				<div className='flex gap-4 items-center justify-center flex-wrap '>
					<ul className='flex flex-col sm:flex-row items-center justify-end gap-4'>
						<li>
							<Link href={''} className='flex items-center gap-2'>
								<MdOutlineContactPhone />
								<span>+8801723675431</span>
							</Link>
						</li>
						<li>
							<Link href={''} className='flex items-center gap-2'>
								<IoMdTimer />
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
