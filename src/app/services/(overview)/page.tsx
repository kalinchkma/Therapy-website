/** @format */

import ServicesPageComponent from '@/components/services';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'physio therapy services',
};

export default function ServicesPage() {
	return (
		<div className='w-full'>
			<ServicesPageComponent />
		</div>
	);
}
