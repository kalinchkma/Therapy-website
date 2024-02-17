/** @format */

'use client';

import React from 'react';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

import SectionHeader from '../common/section-header';
import ReviewCard from '../common/review-card';
import ReactPlayer from 'react-player';
import ContentWrapper from '../common/content-wrapper';

const test_data = [
	{
		url: '/videos/t.mp4',
		thumbnil: '/images/service1.jpg',
	},
	{
		url: 'https://www.youtube.com/watch?v=AKbelTywKhs&t=775s',
		thumbnil: '/images/service2.jpg',
	},
	{
		url: 'https://www.youtube.com/watch?v=GA9_QJAhr8Q&t=1610s',
		thumbnil: '/images/service3.jpg',
	},
	{
		url: 'https://www.youtube.com/watch?v=cQ7FhWRXCKI',
		thumbnil: '/images/service4.jpg',
	},
	{
		url: 'https://www.youtube.com/watch?v=UPkMkIOzej8',
		thumbnil: '/images/slide3.jpg',
	},
];

export default function CustomerReview() {
	return (
		<section className='w-full py-28'>
			<ContentWrapper>
				<div className='flex justify-center md:justify-start'>
					<SectionHeader title='Customer Review' />
				</div>
				<div className='flex'>
					<Carousel
						opts={{
							align: 'start',
							loop: true,
						}}
						className='w-full'>
						<CarouselContent>
							{test_data.map((data, index) => (
								<CarouselItem key={index} className='md:basis-1/2 lg:basis-1/4'>
									<div className=''>
										<ReviewCard videoUrl={data.url} thumbnil={data.thumbnil} />
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</ContentWrapper>
		</section>
	);
}
