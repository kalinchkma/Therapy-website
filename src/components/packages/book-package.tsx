/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import BookPackageForm from './book-package-form';
import { getInformations } from '@/methods/information-method';

export default async function BookPackagePageComponent({
	p,
}: {
	p: {
		id: number;
		description: string;
		title: string;
		package_type: string;
		price: number;
		offers: number | null;
		moneyType: string | null;
		packageDetails: string;
	};
}) {
	const information = await getInformations();

	return (
		<div className='w-full'>
			{/* <PageTitle title={p.title} description='Book your package' />
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Our Packages', url: '/packages' },
					{ name: p.title },
				]}
			/> */}
			<ContentWrapper className='py-5'>
				<div className='w-full md:w-[600px] mx-auto'>
					<BookPackageForm p={p} information={information[0]} />
				</div>
			</ContentWrapper>
		</div>
	);
}
