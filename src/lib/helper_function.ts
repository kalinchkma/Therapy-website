/** @format */

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verify_auth_token } from '@/lib/utils';
import { AuthTokenName, User } from './definitions';
import { getUserByEmail } from '@/methods/users';

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

export async function checkAndGetAuth() {
	const cookieStore = cookies();

	if (cookieStore.has(AuthTokenName)) {
		const authCookie = cookieStore.get(AuthTokenName);
		const token = await verify_auth_token(authCookie?.value!);
		if (!token) {
			return false;
		} else {
			const a_token = token as { name: string; email: string; iat: number };
			const getLoggedInUser = await getUserByEmail(a_token.email);
			return getLoggedInUser as User;
		}
	}
}
