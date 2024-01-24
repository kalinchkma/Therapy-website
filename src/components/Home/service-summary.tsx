/** @format */

import React from 'react';
import { ServiceCard } from '../common/service-card';

import { Services } from '@/lib/static_data';
import ActionButton from '../common/action-button';
import ContentWrapper from '../common/content-wrapper';

export default function ServiceSummary() {
	return (
		<section className='w-full py-16'>
			<ContentWrapper className=' flex items-center justify-center'>
				<div className='w-full grid md:grid-cols-3 lg:grid-cols-4 gap-8'>
					<div className='md:col-span-3 lg:col-span-1'>
						<div className='flex w-full flex-col'>
							<h4 className='text-4xl font-bold capitalize mb-8'>
								We offer various Physio Services
							</h4>
							<p className='text-zinc-500 mb-5'>
								We are proud to offer a wide range of comprehensive services to
								meet the needs of adults, seniors, and pediatric patients. Our
								team of professional caregivers specialize in providing
								personalized medical care, rehabilitative therapy and companion
								assistance.
							</p>
							<div className='flex items-center justify-start'>
								<ActionButton
									link='/service'
									title='See all Services'
									className='inline-flex'
								/>
							</div>
						</div>
					</div>
					{Services.slice(0, 3).map((service) => (
						<div className='col-span-1' key={service.title}>
							<ServiceCard
								title={service.title}
								description={service.description}
								thumbnailImage={service.thumbnailImage}
								serviceLink={service.serviceLink}
							/>
						</div>
					))}
				</div>
			</ContentWrapper>
		</section>
	);
}
