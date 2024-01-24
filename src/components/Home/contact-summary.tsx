/** @format */

import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdContactPhone } from 'react-icons/md';
import { IoMdChatboxes } from 'react-icons/io';
import MoreBtn from '../common/more-btn';
import ContentWrapper from '../common/content-wrapper';

export default function ContactSummary() {
	return (
		<section className='w-full bg-stone-100 py-16'>
			<ContentWrapper>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					<div className='col-span-1'>
						<div className='flex w-full flex-col'>
							<h4 className='flex items-center text-zinc-500 justify-start text-xl md:text-2xl lg:text-3xl font-extrabold gap-2 mb-8 capitalize'>
								<IoMdChatboxes />
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

					<div className='col-span-1'>
						<div className='flex w-full flex-col'>
							<h4 className='flex items-center  text-zinc-500 justify-start text-xl md:text-2xl lg:text-3xl font-extrabold gap-2 mb-8 capitalize'>
								<FaLocationDot />
								<span>Location</span>
							</h4>
							<h5 className='font-bold text-base mb-4'>Check our location</h5>
							<p className='text-zinc-500 mb-6'>
								World-class Physiotherapy Clinic, We are here for you from 10 AM
								to 10 PM, Please submit your Appoinment here
							</p>
						</div>
					</div>

					<div className='col-span-1'>
						<div className='flex w-full flex-col'>
							<h4 className='flex items-center  text-zinc-500 justify-start text-xl md:text-2xl lg:text-3xl font-extrabold gap-2 mb-8 capitalize'>
								<MdContactPhone />
								<span>Contact</span>
							</h4>
							<h5 className='font-bold text-base mb-4'>
								Easy way to contact us
							</h5>
							<p className='text-zinc-500 mb-6'>
								World-class Physiotherapy Clinic, We are here for you from 10 AM
								to 10 PM, Please submit your Appoinment here
							</p>
						</div>
					</div>
				</div>
			</ContentWrapper>
		</section>
	);
}
