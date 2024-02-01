/** @format */

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verify_auth_token } from '@/lib/utils';
import { AuthTokenName, User, UsersType } from './definitions';
import { getUserByEmail } from '@/methods/users';
import fs from 'fs/promises';

export async function checkAuth() {
	const cookie = cookies();
	const auth = cookie.get(AuthTokenName);
	if (auth) {
		const verify = await verify_auth_token(auth.value);
		if (verify) {
			const authUser = verify as User;
			if (authUser.user_type === UsersType.admin) {
				redirect('/dashboard');
			} else {
				redirect('/profile');
			}
		}
	}
}

// check authentication
export async function checkAndGetAuth() {
	const cookieStore = cookies();

	if (cookieStore.has(AuthTokenName)) {
		const authCookie = cookieStore.get(AuthTokenName);
		const token = await verify_auth_token(authCookie?.value!);
		if (!token) {
			return '/404';
		} else {
			const a_token = token as { name: string; email: string; iat: number };
			const getLoggedInUser = await getUserByEmail(a_token.email);
			if (getLoggedInUser) {
				return getLoggedInUser as User;
			} else {
				return '/404';
			}
		}
	} else {
		return '/login';
	}
}

// upload images
export async function uploadFile(file: File, path: string) {
	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);
	try {
		await fs.writeFile(`./public${path}`, buffer, 'binary');
		return true;
	} catch (err) {
		return false;
	}
}

// delete file
export async function deleteFile(path: string) {
	try {
		await fs.unlink(`./public${path}`);
		return true;
	} catch (err) {
		return false;
	}
}
