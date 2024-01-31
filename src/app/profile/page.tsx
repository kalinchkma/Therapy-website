/** @format */

import ProfilePageCompnent from '@/components/Profile';

import { checkAndGetAuth } from '@/lib/helper_function';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ProfilePage() {
	const auth = await checkAndGetAuth();
	if (auth === '/404') {
		redirect('/404');
	} else if (auth === '/login') {
		redirect('/login');
	}

	return (
		<div className='w-full'>
			<ProfilePageCompnent />
		</div>
	);
}
