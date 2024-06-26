/** @format */
'use client';
import React, { useEffect, useState } from 'react';

import BigNavigationMenu from './big-navigation';
import SmallNavigation from './small-navigation';
import AppLogo from '../common/app-logo';
import { cn } from '@/lib/utils';
import ContentWrapper from '../common/content-wrapper';

export default function Navigation({
	className,
	informations,
	host,
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
	host: string;
}) {
	const [sticky, setSticky] = useState<boolean>(false);
	useEffect(() => {
		const add_event = () => {
			if (window.scrollY > 200) {
				setSticky(true);
			} else {
				setSticky(false);
			}
		};
		window.addEventListener('scroll', add_event);

		return () => {
			window.removeEventListener('scroll', add_event);
		};
	}, []);
	return (
		<nav
			className={cn(
				'w-full z-50 bg-white',
				sticky && 'fixed top-0 left-0 shadow-2xl ',
			)}>
			<ContentWrapper
				className={cn('flex flex-row py-5', sticky && 'py-3', className)}>
				{/* logo */}
				<div className='flex'>
					{informations.length > 0 && (
						<AppLogo
							logo={`${host}${informations[0].logo}`}
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
							logo={`${host}${informations[0].logo}`}
							name={informations[0].website_name}
						/>
					)}
				</div>
			</ContentWrapper>
		</nav>
	);
}
