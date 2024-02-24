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
import { fetchBanner } from '@/methods/home-page-methods';
import { Content } from '@/actions/home-page-actions';
import { cn } from '@/lib/utils';

export default async function HomePageBanner({
	className,
}: {
	className?: string;
}) {
	const banners = await fetchBanner();
	return (
		<section className={cn('w-full', className)}>
			<Carousel opts={{ loop: true }}>
				<CarouselContent>
					{banners.map((data, index) => {
						const banner = JSON.parse(String(data.content)) as Content;
						return (
							<CarouselItem key={index}>
								<PageBanner
									bgImageUrl={banner.image}
									className='h-[50vh] md:h-[80vh] p-3 container'>
									<BannerContent
										bannerTitle={banner.title}
										bannerSecondaryTitle={banner.subTitle}
										btnLink={banner.navigate_link.URL}
										btnTitle={banner.navigate_link.title}
										className='w-full md:w-8/12'
									/>
								</PageBanner>
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	);
}
