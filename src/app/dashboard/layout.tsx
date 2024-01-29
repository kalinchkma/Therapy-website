/** @format */

import type { Metadata } from 'next';

import Sidebar from '@/components/Dashboard/sidebar';
import DashboardHeader from '@/components/Dashboard/dashboard-header';
import { logout } from '@/actions/auth_actions';
import { cookies } from 'next/headers';
import { AuthTokenName, User, UsersType } from '@/lib/definitions';
import { verify_auth_token } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { getUserByEmail } from '@/methods/users';
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
	if (!auth) {
		redirect('/login');
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
			<div className='flex-grow h-[100vh]'>
				<DashboardHeader />
				{children}
			</div>
		</div>
	);
}
