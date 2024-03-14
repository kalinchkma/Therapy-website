/** @format */

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

import ContentWrapper from '../common/content-wrapper';
import { getAllCustomerReview } from '@/methods/customer-review-methods';

type Review = {
	id: number;
	createdAt: Date | null;
	updatedAt: Date | null;
	video_url: string;
	thumbnail_image: string;
};

export default async function CustomerReview({ host }: { host: string }) {
	const reviews: Review[] = await getAllCustomerReview();
	return (
		reviews.length > 0 && (
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
								{reviews.map((data, index) => (
									<CarouselItem
										key={index}
										className='md:basis-1/2 lg:basis-1/4'>
										<div className=''>
											<ReviewCard
												videoUrl={data.video_url}
												thumbnil={`${host}${data.thumbnail_image}`}
											/>
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
		)
	);
}
