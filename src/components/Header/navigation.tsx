/** @format */

import React from 'react';

import BigNavigationMenu from './big-navigation';
import SmallNavigation from './small-navigation';
import AppLogo from '../app_logo';
import { cn } from '@/lib/utils';

export default function Navigation({ className }: { className?: string }) {
	return (
		<nav className='w-full'>
			<div className={cn('container flex flex-row py-2', className)}>
				{/* logo */}
				<div className='flex'>
					<AppLogo />
				</div>
				{/* navigation link */}
				<div className='flex flex-grow justify-end'>
					{/* Big screen navigation */}
					<BigNavigationMenu />
					{/* Small Screen Navigation */}
					<SmallNavigation />
				</div>
			</div>
		</nav>
	);
}
