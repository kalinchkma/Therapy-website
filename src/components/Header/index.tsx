/** @format */
'use client';

import { usePathname } from 'next/navigation';
import { IgnoreNavigation } from '@/lib/static_data';
import Navigation from './navigation';
import TopHeader from './top-header';
import AdminHeader from './admin-header';
import { UsersType } from '@/lib/definitions';

export default function Header({
	auth,
	authType,
}: {
	auth?: boolean;
	authType?: string;
}) {
	const pathname = usePathname();
	return !pathname.startsWith('/dashboard') &&
		!IgnoreNavigation.includes(pathname.trim()) ? (
		<header className='flex flex-col'>
			{authType === UsersType.admin && <AdminHeader />}
			<TopHeader auth={auth} />
			<Navigation />
		</header>
	) : (
		<></>
	);
}
