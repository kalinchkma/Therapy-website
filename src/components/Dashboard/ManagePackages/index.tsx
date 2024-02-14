/** @format */

import React from 'react';
import ManagePackagesTable from './manage-package-table';
import { getPackages } from '@/methods/packages-method';
import { Package } from './columns';

export default async function ManagePackagesComponent() {
	const allPackages = await getPackages();
	return (
		<div className='w-full p-4'>
			{/* package table */}
			<ManagePackagesTable data={allPackages as Package[]} />
		</div>
	);
}
