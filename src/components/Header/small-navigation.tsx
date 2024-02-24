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
import AppLogo from '../common/app-logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ActionButton from '../common/action-button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

export default function SmallNavigation({
	logo,
	name,
}: {
	logo: string;
	name: string;
}) {
	const pathname = usePathname();
	return (
		<div className='flex lg:hidden'>
			<Sheet>
				<SheetTrigger>
					<AlignRight />
				</SheetTrigger>
				<SheetContent side={'left'}>
					<div className='w-full py-5 px-5'>
						<DrawerHeader className='flex justify-between'>
							<AppLogo logo={logo} name={name} />
						</DrawerHeader>
						<div className='pb-0'>
							<ul>
								{NavigationLinks.map((link) => (
									<li key={link.name + link.path}>
										<Link
											href={link.path}
											className={cn(
												'flex items-center justify-start font-bold  text-xl text-zinc-700  pb-2 h-10 w-max rounded-md bg-background px-2 py-2 text-md transition-colors hover:bg-accent hover:text-accent-foreground  focus:outline-none disabled:pointer-events-none ',
												link.path === pathname && 'text-blue-900',
											)}>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
							<div className='flex items-center justify-center md:justify-start w-full'>
								<ActionButton link='/appointment' title='Book Appointment' />
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
