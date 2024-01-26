/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';

export default function ContactPageComponent() {
	return (
		<div className='w-full'>
			<PageTitle title='Contact' />
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Contact', url: '/contact' },
				]}
			/>
		</div>
	);
}
