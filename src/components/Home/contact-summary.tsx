/** @format */

import React from 'react';
import MoreBtn from '../common/more-btn';
import ContentWrapper from '../common/content-wrapper';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';
import { ContactData } from '@/lib/static_data';

export default function ContactSummary() {
	return (
		<section className='w-full bg-stone-100 py-16'>
			<ContentWrapper>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					<div className='col-span-1'>
						<div className='flex w-full flex-col'>
							<h4 className='flex items-center text-zinc-500 justify-start text-xl md:text-2xl lg:text-3xl font-extrabold gap-2 mb-8 capitalize'>
								<IconCreator icon={IconType.Schedule} />
								<span>appointment</span>
							</h4>
							<h5 className='font-bold text-base mb-4'>Book an appointment</h5>
							<p className='text-zinc-500 mb-3'>
								World-class Physiotherapy Clinic, We are here for you from 10 AM
								to 10 PM, Please submit your Appoinment here
							</p>
							<div className='flex items-center justify-start'>
								<MoreBtn link={'/appointment'} title='Book Appointment Now' />
							</div>
						</div>
					</div>
					{ContactData.map((data) => (
						<div className='col-span-1' key={data.title}>
							<div className='flex w-full flex-col'>
								<h4 className='flex items-center  text-zinc-500 justify-start text-xl md:text-2xl lg:text-3xl font-extrabold gap-2 mb-8 capitalize'>
									<IconCreator icon={data.icon!} />
									<span>{data.title}</span>
								</h4>
								{data.location && (
									<>
										<h5 className='font-bold text-base mb-4'>
											{data.location.title}
										</h5>
										<p className='text-zinc-500 mb-6'>
											{data.location.details}
										</p>
									</>
								)}
								{data.contact && (
									<>
										<h5 className='font-bold text-base mb-4'>
											{data.contact.title}
										</h5>
										<div className='grid sm:grid-cols-2 gap-3'>
											{data.contact.emails && (
												<div>
													<h6 className='font-bold text-zinc-500'>
														{data.contact.emails.title}
													</h6>
													{data.contact.emails.data.map((mail) => (
														<p className='text-zinc-400' key={mail}>
															{mail}
														</p>
													))}
												</div>
											)}
											{data.contact.phoneNumbers && (
												<div>
													<h6 className='font-bold text-zinc-500'>
														{data.contact.phoneNumbers.title}
													</h6>
													{data.contact.phoneNumbers.data.map((number) => (
														<p className='text-zinc-400 ' key={number}>
															{number}
														</p>
													))}
												</div>
											)}
										</div>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</ContentWrapper>
		</section>
	);
}
