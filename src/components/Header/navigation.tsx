/** @format */

import React from 'react';

import BigNavigationMenu from './big-navigation';
import SmallNavigation from './small-navigation';
import AppLogo from '../common/app-logo';
import { cn } from '@/lib/utils';
import ContentWrapper from '../common/content-wrapper';

export default function Navigation({ className }: { className?: string }) {
	return (
		<nav className='w-full'>
			<ContentWrapper className={cn('flex flex-row py-5', className)}>
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
			</ContentWrapper>
		</nav>
	);
}
