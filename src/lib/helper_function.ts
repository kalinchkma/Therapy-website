/** @format */

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verify_auth_token } from '@/lib/utils';
import { AuthTokenName } from './definitions';

export async function checkAuth() {
	const cookie = cookies();
	const auth = cookie.get(AuthTokenName);
	if (auth) {
		const verify = await verify_auth_token(auth.value);
		if (verify) {
			redirect('/dashboard');
		}
	}
}
