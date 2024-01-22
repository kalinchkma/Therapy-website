/** @format */

import * as React from 'react';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

import PageBanner from '../common/page-banner';
import ActionButton from '../common/action-button';
import BannerContent from './banner-content';

export function HomePageBanner() {
	return (
		<div className='w-full'>
			<Carousel opts={{ loop: true }}>
				<CarouselContent>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem key={index}>
							<PageBanner bgImageUrl='/images/slide1.jpg'>
								<BannerContent
									bannerTitle='We are a unique physio therapy clinic'
									bannerSecondaryTitle='Commited to helping'
									btnLink='/about'
									btnTitle='More About Us'
									className='w-full md:w-8/12'
								/>
							</PageBanner>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
