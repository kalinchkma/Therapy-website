/** @format */

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminHeader from '@/components/Header/admin-header';
import { cookies } from 'next/headers';
import { AuthTokenName } from '@/lib/definitions';
import { verify_auth_token2 } from '@/lib/utils';

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
	const cookieStore = cookies();
	const authToken = cookieStore.has(AuthTokenName);
	let token: boolean = false;
	if (authToken) {
		token = await verify_auth_token2(cookieStore.get(AuthTokenName)?.value!);
	}

	return (
		<html lang='en'>
			<body className={nunito.className}>
				{token && <AdminHeader />}
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
