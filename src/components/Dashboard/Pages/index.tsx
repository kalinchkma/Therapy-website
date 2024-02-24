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

export default function PagesPageComponent() {
	return (
		<div className='w-full p-4'>
			{/* Pages naviagation */}
			<PageNavigation />
		</div>
	);
}
