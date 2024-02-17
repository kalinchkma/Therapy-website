/** @format */

import React from 'react';
import AddCustomerReview from './add-customer-review';
import { getAllCustomerReview } from '@/methods/customer-review-methods';
import ReviewCard from '@/components/common/review-card';

export default async function CustomerReviewPageComponent() {
	const reviews = await getAllCustomerReview();
	return (
		<div className='w-full p-4'>
			<AddCustomerReview />
			<div className='grid grid-cols-4'>
				{reviews.map((review, index) => (
					<ReviewCard
						videoUrl={review.video_url}
						thumbnil={review.thumbnail_image}
						key={index}
					/>
				))}
			</div>
		</div>
	);
}
