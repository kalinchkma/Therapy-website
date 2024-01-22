/** @format */

import React from 'react';

import BigNavigationMenu from './big-navigation';
import SmallNavigation from './small-navigation';
import AppLogo from '../app_logo';

export default function Navigation() {
	return (
		<nav className='w-full flex flex-row py-2'>
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
		</nav>
	);
}
