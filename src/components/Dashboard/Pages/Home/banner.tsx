/** @format */

import { addBanner } from '@/actions/home-page-actions';
import { Button } from '@/components/ui/button';
import { fetchBanner } from '@/methods/home-page-methods';
import { Plus } from 'lucide-react';
import React from 'react';
import BannerCard from './banner-card';

export default async function Banner() {
	const banner_content = await fetchBanner();
	const host = process.env.HOST;
	return (
		<div className='w-full flex flex-col gap-10 border-b-2 py-3 max-h-[500px] overflow-y-auto'>
			{/* add banner section */}
			<form action={addBanner}>
				<Button type='submit'>
					Add Banner <Plus />
				</Button>
			</form>
			{/* banner content */}
			{banner_content.map((banner, index) => (
				<BannerCard key={index} banner={banner} host={host as string} />
			))}
		</div>
	);
}
