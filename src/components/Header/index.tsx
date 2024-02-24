/** @format */
'use client';

import { usePathname } from 'next/navigation';
import { IgnoreNavigation } from '@/lib/static_data';
import Navigation from './navigation';
import TopHeader from './top-header';
import AdminHeader from './admin-header';
import { UsersType } from '@/lib/definitions';
import { useEffect, useState } from 'react';

export default function Header({
	auth,
	authType,
	informations,
}: {
	auth?: boolean;
	authType?: string;
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
	const pathname = usePathname();
	return !pathname.startsWith('/dashboard') &&
		!IgnoreNavigation.includes(pathname.trim()) ? (
		<header className='flex flex-col'>
			{authType === UsersType.admin && <AdminHeader />}
			{informations.length > 0 && (
				<TopHeader auth={auth} informations={informations} />
			)}

			<Navigation informations={informations} />
		</header>
	) : (
		<></>
	);
}
