/** @format */

import ProfilePageCompnent from '@/components/Profile';
import { checkAndGetAuth } from '@/lib/helper_function';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

export default async function ProfilePage() {
	const auth = await checkAndGetAuth();
	if (!auth) {
		notFound();
	}
	return (
		<div className='w-full'>
			<ProfilePageCompnent name={`Welcome back ${auth.name}`} />
		</div>
	);
}
