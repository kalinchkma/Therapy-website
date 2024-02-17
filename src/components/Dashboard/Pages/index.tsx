/** @format */

import React from 'react';
import PageNavigation from './page-navigation';
import HomePageConfig from './Home';
import ServicesConfig from './Services';
import ServiceAreaConfig from './ServiceArea';
import OurPackagesConfig from './OurPackages';
import BlogPageConfig from './Blog';
import ContactPageConfig from './Contact';
import AboutPageConfig from './About';
import ShopPageConfig from './Shop';

type Props = {
	params: {
		page: string;
	};
};

export default function PagesPageComponent({ params }: Props) {
	const page = params.page;
	return (
		<div className='w-full p-4'>
			{/* Pages naviagation */}
			<PageNavigation />
			{/* load the respective page details */}
			{page === 'home' && <HomePageConfig />}
			{page === 'services' && <ServicesConfig />}
			{page === 'service-area' && <ServiceAreaConfig />}
			{page === 'packages' && <OurPackagesConfig />}
			{page === 'blog' && <BlogPageConfig />}
			{page === 'contact' && <ContactPageConfig />}
			{page === 'about' && <AboutPageConfig />}
			{page === 'shop' && <ShopPageConfig />}
		</div>
	);
}
