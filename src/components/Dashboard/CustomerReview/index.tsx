/** @format */

import React from 'react';
import AddCustomerReview from './add-customer-review';
import { getAllCustomerReview } from '@/methods/customer-review-methods';

import { Button } from '@/components/ui/button';
import UpdateCustomerReview from './update-customer-review';
import ReviewCardD from './review-card-d';
import DeleteCustomerReview from './delete-customer-review';

export default async function CustomerReviewPageComponent() {
	const reviews = await getAllCustomerReview();
	return (
		<div className='w-full p-4'>
			<AddCustomerReview />
			<div className='grid grid-cols-4 gap-4'>
				{reviews.map((review, index) => (
					<ReviewCardD
						videoUrl={review.video_url}
						thumbnil={review.thumbnail_image}
						key={index}
						admin={
							<div className='flex gap-3'>
								<UpdateCustomerReview review={review} />
								<DeleteCustomerReview id={review.id} />
							</div>
						}
					/>
				))}
			</div>
		</div>
	);
}
