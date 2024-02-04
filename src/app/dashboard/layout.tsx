/** @format */

import type { Metadata } from 'next';

import Sidebar from '@/components/Dashboard/sidebar';
import DashboardHeader from '@/components/Dashboard/dashboard-header';
import { logout } from '@/actions/auth-actions';
import { UsersType } from '@/lib/definitions';
import { redirect } from 'next/navigation';
import { checkAndGetAuth } from '@/lib/helper_function';
export const metadata: Metadata = {
	title: 'Dashboard of Universal Physiotherapy & Rehab Center',
	description: 'This website created by Universal Physiotherapy & Rehab center',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const auth = await checkAndGetAuth();
	if (auth === '/404') {
		redirect(auth);
	} else if (auth === '/login') {
		redirect(auth);
	} else {
		if (!(auth.user_type === UsersType.admin)) {
			redirect('/profile');
		}
	}

	return (
		<div className='w-full flex flex-row'>
			<div className='flex'>
				<Sidebar logout={logout} />
			</div>
			<div className='flex-grow relative'>
				<DashboardHeader className='absolute top-0 left-0 z-50' />
				<div className='w-full h-[100vh] overflow-y-auto pt-[60px]'>
					{children}
				</div>
			</div>
		</div>
	);
}
