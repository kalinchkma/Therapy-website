/** @format */

import React from 'react';

import { redirect } from 'next/navigation';
import OverviewPageComponent from '@/components/Dashboard/Overview';

async function waitFunc() {
	setTimeout(() => {}, 2000);
	return;
}

export default async function DashboardPage() {
	// const test = await waitFunc();
	return (
		<div className='w-full'>
			<OverviewPageComponent />
		</div>
	);
}
