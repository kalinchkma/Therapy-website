/** @format */

import React from 'react';
import PageTitle from '../common/page-title';

export default function ProfilePageCompnent({ name }: { name?: string }) {
	return (
		<div className='w-full'>
			<PageTitle
				title={name!}
				description='Read all blog know about our services'
			/>
		</div>
	);
}
