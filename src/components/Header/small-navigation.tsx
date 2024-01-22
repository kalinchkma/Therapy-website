/** @format */

import React from 'react';
import { AlignRight, X as Close } from 'lucide-react';
import { NavigationLinks } from '@/lib/static_data';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import AppLogo from '../app_logo';
import Link from 'next/link';

export default function SmallNavigation() {
	return (
		<div className='flex lg:hidden'>
			<Drawer direction='top'>
				<DrawerTrigger asChild>
					<Button variant='outline' size='icon'>
						<AlignRight />
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className='w-full h-[100vh]'>
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
											className='flex items-center justify-start font-bold text-xl text-stone-600 pb-2 '>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
							<div className='flex items-center justify-center md:justify-start w-full'>
								<Link
									href={'/appointment'}
									className='inline-flex text-wrap mt-5 bg-blue-900 hover:bg-blue-800 transition-colors py-3 px-4 rounded-3xl text-white font-bold'>
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
