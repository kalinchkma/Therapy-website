/** @format */

'use client';

import * as React from 'react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { NavigationLinks } from '@/lib/static_data';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import ActionButton from '../common/action-button';

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className,
					)}
					{...props}>
					<div className='text-sm font-medium leading-none'>{title}</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

export default function BigNavigationMenu() {
	const pathname = usePathname();

	return (
		<NavigationMenu className='hidden lg:flex'>
			<NavigationMenuList>
				{NavigationLinks.map((link) => (
					<NavigationMenuItem key={link.name}>
						<NavigationMenuLink
							href={link.path}
							className={cn(
								'group inline-flex h-10 w-max items-center justify-center px-3 text-[14px] font-bold text-zinc-700 transition-colors hover:text-blue-800',
								link.path === pathname && 'text-blue-800',
							)}>
							{link.name}
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
			<ActionButton
				link='/appointment'
				title='Book Appointment'
				className='ml-5'
			/>
		</NavigationMenu>
	);
}
