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

export function HomePageBanner() {
	return (
		<div className='w-full'>
			<Carousel opts={{ loop: true }}>
				<CarouselContent>
					{BannserSlideData.map((data) => (
						<CarouselItem key={data.title}>
							<PageBanner bgImageUrl={data.slideImage}>
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
		</div>
	);
}
