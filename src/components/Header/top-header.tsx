/** @format */

import Link from 'next/link';
import React from 'react';
import { SocialLinks } from '@/lib/static_data';
import SocialLinkCreator from '../social-link';
import { cn } from '@/lib/utils';
import { MdOutlineContactPhone } from 'react-icons/md';
import { IoMdTimer } from 'react-icons/io';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

export default function TopHeader({ className }: { className?: string }) {
	return (
		<nav className='bg-zinc-100 w-full'>
			<div
				className={cn(
					'flex container flex-col md:flex-row items-center justify-center gap-2 md:justify-between py-2 ',
					className,
				)}>
				<div className='flex'>
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
								<li key={link.link}>
									<SocialLinkCreator
										icon={link.icon}
										link={link.link}
										className='font-bold text-xl'
									/>
								</li>
							))}
						</ul>
					</div>
					<Select>
						<SelectTrigger className='focus:ring-0 focus:ring-ring focus:ring-offset-0 px-2 py-1'>
							<SelectValue placeholder='Lang' defaultChecked={true} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Select Language</SelectLabel>
								<SelectItem value='English' defaultChecked={true}>
									English
								</SelectItem>
								<SelectItem value='Bangla'>Bangla</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
		</nav>
	);
}
