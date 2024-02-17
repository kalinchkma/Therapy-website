/** @format */

import React from 'react';
import MoreBtn from '../common/more-btn';
import ContentWrapper from '../common/content-wrapper';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';

type Props = {
	information: {
		emails: string;
		id: number;
		openning_hours: unknown;
		location: string;
		contact_numbers: string;
		social_links: unknown;
		logo: string;
		website_name: string;
	};
};

export default async function ContactSummary({ information }: Props) {
	return (
		<section className='w-full bg-stone-100 py-28'>
			<ContentWrapper>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					<div className='col-span-1'>
						<div className='flex w-full flex-col'>
							<h4 className='flex items-center text-zinc-500 justify-start text-xl md:text-2xl lg:text-3xl font-extrabold gap-2 mb-8 capitalize'>
								<IconCreator icon={IconType.Schedule} />
								<span>appointment</span>
							</h4>
							<h5 className='font-bold text-base mb-4'>
								অ্যাপয়েন্টমেন্ট বুক করুন
							</h5>
							<p className='text-zinc-500 mb-3'>
								বিশ্বমানের ফিজিওথেরাপি, আমরা আপনার জন্য এখানে সকাল 10 টা থেকে
								রাত 10 টা পর্যন্ত, দয়া করে এখানে আপনার অনুমোদন জমা দিন
							</p>
							<div className='flex items-center justify-start'>
								<MoreBtn
									link={'/appointment'}
									title='অ্যাপয়েন্টমেন্ট বুক করুন'
								/>
							</div>
						</div>
					</div>
					<div className='col-span-1'>
						{information.location && (
							<div className='flex w-full flex-col'>
								<h4 className='flex items-center  text-zinc-500 justify-start text-xl md:text-2xl lg:text-3xl font-extrabold gap-2 mb-8 capitalize'>
									<IconCreator icon={IconType.Location} />
									<span>Location</span>
								</h4>

								<h5 className='font-bold text-base mb-4'>আমাদের অবস্থান</h5>
								<p className='text-zinc-500 mb-6'>{information.location}</p>
							</div>
						)}
					</div>
					{information.contact_numbers && information.emails && (
						<div className='col-span-1'>
							<h4 className='flex items-center  text-zinc-500 justify-start text-xl md:text-2xl lg:text-3xl font-extrabold gap-2 mb-8 capitalize'>
								<IconCreator icon={IconType.Contact} />
								<span>Contact</span>
							</h4>

							<h5 className='font-bold text-base mb-4'>
								আমাদের সাথে যোগাযোগ করুন
							</h5>
							<div className='grid sm:grid-cols-2 gap-3'>
								{information.emails && (
									<div>
										<h6 className='font-bold text-zinc-500'>Email</h6>
										{information.emails.split(',').map((mail) => (
											<p className='text-zinc-400' key={mail}>
												{mail}
											</p>
										))}
									</div>
								)}
								{information.contact_numbers && (
									<div>
										<h6 className='font-bold text-zinc-500'>Phone</h6>
										{information.contact_numbers.split(',').map((number) => (
											<p className='text-zinc-400 ' key={number}>
												{number}
											</p>
										))}
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</ContentWrapper>
		</section>
	);
}
