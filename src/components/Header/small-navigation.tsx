/** @format */
'use client';
import React from 'react';
import { AlignRight, X as Close } from 'lucide-react';
import { NavigationLinks } from '@/lib/static_data';
import { usePathname } from 'next/navigation';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import AppLogo from '../common/app_logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SmallNavigation() {
	const pathname = usePathname();
	return (
		<div className='flex lg:hidden'>
			<Drawer direction='left'>
				<DrawerTrigger asChild>
					<Button variant='outline' size='icon'>
						<AlignRight />
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className='w-full py-8 px-8'>
						<DrawerHeader className='flex justify-between'>
							<AppLogo />
							<DrawerClose asChild>
								<Button variant='outline' size='icon'>
									<Close />
								</Button>
							</DrawerClose>
						</DrawerHeader>
						<div className='p-4 pb-0'>
							<ul>
								{NavigationLinks.map((link) => (
									<li key={link.name + link.path}>
										<Link
											href={link.path}
											className={cn(
												'flex items-center justify-start font-bold  text-xl text-zinc-700  pb-2 h-10 w-max rounded-md bg-background px-4 py-2 text-md transition-colors hover:bg-accent hover:text-accent-foreground  focus:outline-none disabled:pointer-events-none ',
												link.path === pathname && 'text-fuchsia-900',
											)}>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
							<div className='flex items-center justify-center md:justify-start w-full'>
								<Link
									href={'/appointment'}
									className='inline-flex text-wrap mt-5 bg-fuchsia-900 hover:bg-fuchsia-800 transition-colors py-3 px-4 rounded-3xl text-white font-bold'>
									Book Appointment
								</Link>
							</div>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
