/** @format */

import Link from 'next/link';
import React from 'react';
import { SocialLinks } from '@/lib/static_data';
import SocialLinkCreator from '../common/social-link';
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

import ContentWrapper from '../common/content-wrapper';
import { logout } from '@/actions/auth-actions';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';

export default function TopHeader({
	className,
	auth,
}: {
	className?: string;
	auth?: boolean;
}) {
	return (
		<nav className='bg-zinc-100 w-full'>
			<ContentWrapper
				className={cn(
					'flex container flex-col md:flex-row items-center justify-center gap-2 md:justify-between py-2 ',
					className,
				)}>
				<div className='flex gap-4 items-center justify-center flex-wrap '>
					<Select>
						<SelectTrigger className='inline-flex focus:ring-0 focus:ring-ring focus:ring-offset-0 px-2 py-1 w-[80px]'>
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
										className='font-bold text-xl text-zinc-600'
									/>
								</li>
							))}
						</ul>
					</div>
					{auth ? (
						<React.Fragment>
							<Link href={'/profile'} className='p-3 bg-zinc-50 hover:bg-white'>
								<IconCreator icon={IconType.Profile} />
							</Link>
							<form action={logout}>
								<button type='submit' className='p-3 bg-zinc-50 hover:bg-white'>
									<IconCreator icon={IconType.Logout} />
								</button>
							</form>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Link
								href={'/login'}
								className='py-1 px-3 bg-zinc-50 hover:bg-white'>
								Login
							</Link>
							<Link
								href={'/signup'}
								className='py-1 px-3 bg-zinc-50 hover:bg-white'>
								Signup
							</Link>
						</React.Fragment>
					)}
				</div>
			</ContentWrapper>
		</nav>
	);
}
