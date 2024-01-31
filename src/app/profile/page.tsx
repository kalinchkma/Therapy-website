/** @format */

import ProfilePageCompnent from '@/components/Profile';
import { checkAndGetAuth } from '@/lib/helper_function';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ProfilePage() {
	const auth = await checkAndGetAuth();
	let name: string = '';
	if (auth === '/404') {
		redirect('/404');
	} else if (auth === '/login') {
		redirect('/login');
	} else {
		name = auth.name!;
	}

	return (
		<div className='w-full'>
			<ProfilePageCompnent name={name} />
		</div>
	);
}
