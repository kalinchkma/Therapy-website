/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import ActionButton from '../common/action-button';
import PackageCard from '../common/package-card';
import { Packages } from '@/lib/static_data';
import { getPackages } from '@/methods/packages-method';
import { MoneyType, PackageType } from '@/lib/definitions';

export default async function PackagesPageComponent() {
	const allPackages = await getPackages();
	return (
		<div className='w-full'>
			<PageTitle
				title='Our Packages'
				description='Check our packages. we provide a extra ordinary physio therapy service package'
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
