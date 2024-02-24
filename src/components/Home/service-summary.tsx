/** @format */

import React from 'react';
import { ServiceCard } from '../common/service-card';

import { Services } from '@/lib/static_data';
import ActionButton from '../common/action-button';
import ContentWrapper from '../common/content-wrapper';
import { getAllServicesPublic } from '@/methods/services-method';
import { v4 } from 'uuid';

type S = {
	id: number;
	name: string;
	description: string | null;
	price: string | null;
	thumbnailImage: string;
	content: string | null;
	published: number | null;
};

export default async function ServiceSummary() {
	const services = await getAllServicesPublic();
	let service_pin: S[] = [];
	if (services) {
		if (services.length > 3) {
			service_pin = services.splice(0, 3);
		} else {
			service_pin = services;
		}
	}
	return (
		<section className='w-full py-28 '>
			<ContentWrapper className=' flex items-center justify-center'>
				<div className='w-full grid md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{/* appointment section */}
					<div className='md:col-span-3 lg:col-span-1'>
						<div className='flex w-full flex-col'>
							<h4 className='text-4xl font-bold capitalize mb-8'>
								আমরা বিভিন্ন ফিজিও সেবা দিয়ে থাকি
							</h4>
							<p className='text-zinc-600 text-lg mb-5'>
								আমরা বিস্তৃত বিস্তৃত পরিষেবা সরবরাহ করতে পেরে গর্বিত
								প্রাপ্তবয়স্ক, প্রবীণ এবং শিশু রোগীদের চাহিদা পূরণ করুন। আমাদের
								পেশাদার যত্নশীলদের দল সরবরাহে বিশেষজ্ঞ ব্যক্তিগতকৃত চিকিৎসা
								যত্ন, পুনর্বাসন থেরাপি এবং সহচর সহায়তার।
							</p>
							<div className='flex items-center justify-start'>
								<ActionButton
									link='/services'
									title='সকল সেবা দেখুন'
									className='inline-flex'
								/>
							</div>
						</div>
					</div>
					{service_pin.map((service, index) => (
						<div className='col-span-1' key={index}>
							<ServiceCard
								title={service.name}
								description={service.description!}
								thumbnailImage={service.thumbnailImage}
								serviceLink={`/services/${v4()}${service.id}`}
							/>
						</div>
					))}
				</div>
			</ContentWrapper>
		</section>
	);
}
