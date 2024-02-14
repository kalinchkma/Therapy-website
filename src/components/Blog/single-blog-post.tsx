/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import { Metadata } from 'next';

export default function SingleBlogPostComponent() {
	return (
		<div className='w-full'>
			<PageTitle
				title='Individual post title'
				description='Read all blog know about our services'
			/>
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Blog', url: '/blog' },
				]}
			/>
		</div>
	);
}
