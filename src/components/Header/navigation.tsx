/** @format */
'use client';
import React from 'react';

import BigNavigationMenu from './big-navigation';
import SmallNavigation from './small-navigation';
import AppLogo from '../common/app-logo';
import { cn } from '@/lib/utils';
import ContentWrapper from '../common/content-wrapper';

export default function Navigation({
	className,
	informations,
}: {
	className?: string;
	informations: {
		id: number;
		openning_hours: unknown;
		emails: string;
		location: string;
		contact_numbers: string;
		social_links: unknown;
		logo: string;
		website_name: string;
		product_shipping_charge: unknown;
	}[];
}) {
	return (
		<nav className='w-full'>
			<ContentWrapper className={cn('flex flex-row py-5', className)}>
				{/* logo */}
				<div className='flex'>
					{informations.length > 0 && (
						<AppLogo
							logo={informations[0].logo}
							name={informations[0].website_name}
						/>
					)}
				</div>
				{/* navigation link */}
				<div className='flex flex-grow justify-end'>
					{/* Big screen navigation */}
					<BigNavigationMenu />
					{/* Small Screen Navigation */}
					{informations.length > 0 && (
						<SmallNavigation
							logo={informations[0].logo}
							name={informations[0].website_name}
						/>
					)}
				</div>
			</ContentWrapper>
		</nav>
	);
}
