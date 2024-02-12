/** @format */

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

import { cookies } from 'next/headers';
import { AuthTokenName, UsersType } from '@/lib/definitions';
import { verify_auth_token, verify_auth_token2 } from '@/lib/utils';
import { getUserByEmail } from '@/methods/users-method';
import { unstable_noStore as noStore } from 'next/cache';
import { checkAndGetAuth } from '@/lib/helper_function';
import { NextURL } from 'next/dist/server/web/next-url';

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
	if (auth !== '/login' && auth !== '/404') {
		hasAuth = true;
		userType = auth.user_type as UsersType;
	}

	return (
		<html lang='en'>
			<body className={nunito.className}>
				<Header auth={hasAuth} authType={userType} />
				{children}
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
