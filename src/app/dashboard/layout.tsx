/** @format */

import type { Metadata } from 'next';

import Sidebar from '@/components/Dashboard/sidebar';
import DashboardHeader from '@/components/Dashboard/dashboard-header';

export const metadata: Metadata = {
	title: 'Dashboard of Universal Physiotherapy & Rehab Center',
	description: 'This website created by Universal Physiotherapy & Rehab center',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='w-full flex flex-row'>
			<div className='flex'>
				<Sidebar />
			</div>
			<div className='flex-grow h-[100vh]'>
				<DashboardHeader />
				{children}
			</div>
		</div>
	);
}
