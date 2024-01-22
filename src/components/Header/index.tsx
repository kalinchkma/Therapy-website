/** @format */
'use client';

import { usePathname } from 'next/navigation';
import { IgnoreNavigation } from '@/lib/static_data';
import Navigation from './navigation';
import TopHeader from './top-header';

export default function Header() {
	const pathname = usePathname();
	return (
		!IgnoreNavigation.includes(pathname.trim()) && (
			<header className='flex flex-col'>
				<TopHeader className='px-5 md:px-10 lg:px-16' />
				<Navigation className='px-5 md:px-10 lg:px-16' />
			</header>
		)
	);
}
