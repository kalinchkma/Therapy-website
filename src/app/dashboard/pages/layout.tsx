/** @format */

import PageNavigation from '@/components/Dashboard/Pages/page-navigation';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='w-full p-4'>
			{/* Pages naviagation */}
			<PageNavigation />
			{children}
		</div>
	);
}
