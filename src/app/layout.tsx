/** @format */

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { cookies } from 'next/headers';
import { AuthTokenName, UsersType } from '@/lib/definitions';
import { verify_auth_token, verify_auth_token2 } from '@/lib/utils';
import { getUserByEmail } from '@/methods/users';
import { unstable_noStore as noStore } from 'next/cache';
import { checkAndGetAuth } from '@/lib/helper_function';

const nunito = Nunito({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Universal Physiotherapy & Rehab Center',
	description: 'This website created by Universal Physiotherapy & Rehab center',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	let userType: UsersType = UsersType.client;
	let hasAuth = false;
	const auth = await checkAndGetAuth();
	if (auth) {
		hasAuth = true;
		if (auth?.user_type === UsersType.admin) {
			userType = UsersType.admin;
		} else if (auth?.user_type === UsersType['team-member']) {
			userType = UsersType['team-member'];
		}
	}

	return (
		<html lang='en'>
			<body className={nunito.className}>
				<Header auth={hasAuth} authType={userType} />
				{children}
				<Footer />
			</body>
		</html>
	);
}
