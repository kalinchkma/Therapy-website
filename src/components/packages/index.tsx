/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import ActionButton from '../common/action-button';
import PackageCard from '../common/package-card';
import { getPackages } from '@/methods/packages-method';
import { MoneyType, PackageType } from '@/lib/definitions';
import { getPageBanner } from '@/methods/page-banner-mothod';
import { Banner } from '@/actions/page-banner-actions';

export default async function PackagesPageComponent() {
	const allPackages = await getPackages();
	const get_banner = await getPageBanner('our-package');
	let page_banner: Banner = {};
	if (get_banner.length > 0) {
		page_banner = JSON.parse(String(get_banner[0].content)) as Banner;
	}
	const host = process.env.HOST as string;
	return (
		<div className='w-full'>
			{/* <PageTitle
				title='Our Packages'
				description='Check our packages. we provide a extra ordinary physio therapy service package'
			/> */}
			<PageTitle
				description={
					page_banner.subTitle
						? page_banner.subTitle
						: 'Check our packages. we provide a extra ordinary physio therapy service package'
				}
				title={page_banner.title ? page_banner.title : 'Our Packages'}
				className={get_banner.length > 0 ? 'py-0' : ''}
				bgImageUrl={`${host}${page_banner.bgImage}`}
				overlayStyles={
					get_banner.length > 0 ? 'bg-zinc-800 py-28 bg-opacity-70' : ''
				}
				titleStyle={get_banner.length > 0 ? 'text-white' : ''}
			/>
			<PageBreadcrumb
				paths={[{ name: 'Home', url: '/' }, { name: 'Our Packages' }]}
			/>
			<ContentWrapper className='py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
					{/* single card */}
					{allPackages.map((data, index) => (
						<PackageCard
							className='col-span-1'
							key={index}
							description={data.description}
							moneyType={data.moneyType as MoneyType}
							packageDetails={data.packageDetails}
							packageLink={`/packages/${data.id}`}
							packageType={data.package_type as PackageType}
							price={data.price}
							offers={data.offers!}
							title={data.title}
						/>
					))}
				</div>
			</ContentWrapper>
		</div>
	);
}
