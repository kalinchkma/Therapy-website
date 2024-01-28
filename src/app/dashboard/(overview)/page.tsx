/** @format */

import React from 'react';

import { redirect } from 'next/navigation';
import OverviewPageComponent from '@/components/Dashboard/Overview';

export default async function DashboardPage() {
	return (
		<div className='w-full'>
			<OverviewPageComponent />
		</div>
	);
}
