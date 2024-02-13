/** @format */

import React from 'react';
import ManagePackagesTable from './manage-package-table';
import CreatePackage from './create-package';

export default async function ManagePackagesComponent() {
	return (
		<div className='w-full p-4'>
			{/* create package */}
			<CreatePackage />
			{/* package table */}
			<ManagePackagesTable data={[]} />
		</div>
	);
}
