/** @format */

'use client';

import * as React from 'react';
import Link from 'next/link';

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
	return (
		<NavigationMenu className='hidden lg:flex'>
			<NavigationMenuList>
				{/* items with nested links */}
				{/* <NavigationMenuItem>
					<NavigationMenuTrigger>Components</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem> */}
				{/* item without nested links */}
				{/* <NavigationMenuItem>
					<Link href='/docs' legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Documentation
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem> */}
				{NavigationLinks.map((link) => (
					<NavigationMenuItem key={link.name}>
						<Link href={link.path} legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								{link.name}
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				))}
				<NavigationMenuItem>
					<Link href={'/appointment'} legacyBehavior passHref>
						<NavigationMenuLink className='flex text-wrap ml-4 bg-blue-900 hover:bg-blue-800 transition-colors py-3 px-4 rounded-3xl text-white font-bold'>
							Book Appointment
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
