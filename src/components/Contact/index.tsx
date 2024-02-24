/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';

import { ContactData, OpenningHours, SocialLinks } from '@/lib/static_data';
import Link from 'next/link';
import { ContactType } from '@/lib/definitions';
import SocialLinkCreator from '../common/social-link';
import { Input } from '../ui/input';
import ContactInfo from './contact-info';
import ContactForm from './contact-form';
import { getInformations } from '@/methods/information-method';

type Openning = {
	Friday: string;
	Saturday: string;
	Sunday: string;
	Monday: string;
	Tuesday: string;
	Wednessday: string;
	Thursday: string;
};

export default async function ContactPageComponent() {
	const getInformation = await getInformations();
	let openning_hours: Openning | null = null;
	if (getInformation.length > 0) {
		openning_hours = JSON.parse(
			String(getInformation[0].openning_hours),
		) as Openning;
	}
	return (
		<div className='w-full'>
			<PageTitle title='Contact' />
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Contact', url: '/contact' },
				]}
			/>
			<ContentWrapper className='py-12'>
				<div className='flex flex-col items-center justify-center lg:items-start lg:justify-start lg:grid lg:grid-cols-4 gap-10 lg:gap-4 '>
					<div className='col-span-1 flex flex-col w-full items-center justify-center'>
						{/* 
                        ---------------------------------------------
                        contact info 
                        ---------------------------------------------
                        */}
						<ContactInfo information={getInformation[0]} />
						{/* 
                        -------------------------------------------------
                        openning hours 
                        -------------------------------------------------
                        */}
						{openning_hours && (
							<div className='w-full flex flex-col mt-10'>
								<h5 className='text-2xl  capitalize mb-8'>
									Openning <span className='font-bold'>Hours</span>
								</h5>
								<ul className='flex flex-col items-start justify-center w-full p-6 bg-blue-900'>
									{Object.entries(openning_hours).map(([key, value], index) => (
										<li
											key={index}
											className='w-full flex flex-row lg:justify-between items-center gap-2 text-zinc-200 border-b border-dashed border-white py-2'>
											<span>{key}</span>
											<span>{value}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
					{/*
                    ------------------------------------------------------
                    right side 
                    ------------------------------------------------------
                    */}
					<div className='w-full flex flex-col justify-center items-center lg:col-span-3'>
						{/* Map section */}
						<div className='flex items-center justify-center w-full'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.332283741445!2d90.36720527468471!3d23.806780378631956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c13e08c8960f%3A0x67e4334fdb0b1a1a!2sUniversal%20Physiotherapy%20%26%20Rehab%20Center!5e0!3m2!1sen!2sbd!4v1706057799374!5m2!1sen!2sbd'
								className='w-[100%] h-[400px]'
								allowFullScreen={true}
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'></iframe>
						</div>
						{/* send message secttion */}
						<div className='flex flex-col items-start justify-center w-full'>
							<h4 className='text-2xl text-zinc-700 py-6'>
								আমাদের <span className='font-bold'>একটি বার্তা পাঠান</span>
							</h4>
							<p className='text-zinc-600 text-base'>
								ফোনে কোনও প্রশ্ন জিজ্ঞাসা করতে নির্দ্বিধায়, অথবা নীচের আমাদের
								যোগাযোগ ফর্মের মাধ্যমে যোগাযোগ করুন। আপনার বার্তাটি সরাসরি
								আমাদের কর্মীদের কাছে প্রেরণ করা হবে যারা যত তাড়াতাড়ি সম্ভব
								উত্তর দেবে।
							</p>
							<div className='flex w-full items-center justify-start p-10 bg-zinc-100 my-10 '>
								<ContactForm />
							</div>
						</div>
					</div>
				</div>
				<div className='grid md:grid-cols-2 p-4'></div>
			</ContentWrapper>
		</div>
	);
}
