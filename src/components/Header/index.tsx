/** @format */
'use client';

import { usePathname } from 'next/navigation';
import { IgnoreNavigation } from '@/lib/static_data';
import Navigation from './navigation';
import TopHeader from './top-header';

export default function Header() {
	const pathname = usePathname();
	return (
		!pathname.startsWith('/dashboard') &&
		!IgnoreNavigation.includes(pathname.trim()) && (
			<header className='flex flex-col'>
				<TopHeader />
				<Navigation />
			</header>
		)
	);
}
