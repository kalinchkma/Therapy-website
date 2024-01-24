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
import BannerContent from './banner-content';
import { BannserSlideData } from '@/lib/static_data';

export default function HomePageBanner() {
	return (
		<section className='w-full'>
			<Carousel opts={{ loop: true }}>
				<CarouselContent>
					{BannserSlideData.map((data) => (
						<CarouselItem key={data.title}>
							<PageBanner
								bgImageUrl={data.slideImage}
								className='h-[50vh] md:h-[75vh] p-3 container'>
								<BannerContent
									bannerTitle={data.title}
									bannerSecondaryTitle={data.secondaryTitle}
									btnLink={data.btnLink}
									btnTitle={data.btnTitle}
									className='w-full md:w-8/12'
								/>
							</PageBanner>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	);
}
