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

export default function ContactPageComponent() {
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
						<div className='bg-purple-900 rounded-sm p-8 w-full flex flex-col'>
							<div className='flex flex-col items-start justify-center text-zinc-200 mb-5 '>
								<h5 className='text-xl font-bold capitalize'>
									Universal Physioterapy & Rehad Center
								</h5>
								<p className='text-zinc-300 text-base'>
									{
										ContactData.filter(
											(data) => data.type === ContactType.Location,
										)[0].location?.details
									}
								</p>
							</div>
							<div className='flex flex-col items-start justify-center text-zinc-200 mb-5  '>
								<h5 className='text-xl font-bold capitalize'>Phone number</h5>
								<ul>
									{ContactData.filter(
										(data) => data.type === ContactType.contact,
									)[0].contact?.phoneNumbers?.data.map((number) => (
										<li key={number}>
											<Link href={'/'}>{number}</Link>
										</li>
									))}
								</ul>
							</div>
							<div className='flex flex-col items-start justify-center text-zinc-200 mb-5  '>
								<h5 className='text-xl font-bold capitalize'>Email</h5>
								<ul>
									{ContactData.filter(
										(data) => data.type === ContactType.contact,
									)[0].contact?.emails?.data.map((email) => (
										<li key={email}>
											<Link href={'/'}>{email}</Link>
										</li>
									))}
								</ul>
							</div>
							<div className='flex flex-col items-start justify-center text-zinc-200 mb-5  '>
								<h5 className='text-xl font-bold capitalize'>Social Media</h5>
								<ul className='flex gap-2'>
									{SocialLinks.map((link, index) => (
										<li key={index}>
											<SocialLinkCreator
												icon={link.icon}
												link={link.link}
												className='text-zinc-200 text-xl'
											/>
										</li>
									))}
								</ul>
							</div>
						</div>
						{/* 
                        -------------------------------------------------
                        openning hours 
                        -------------------------------------------------
                        */}
						<div className='w-full flex flex-col mt-10'>
							<h5 className='text-2xl  capitalize mb-8'>
								Openning <span className='font-bold'>Hours</span>
							</h5>
							<ul className='flex flex-col items-start justify-center w-full p-4 bg-zinc-200'>
								{OpenningHours.map((data) => (
									<li
										key={data.day}
										className='w-full flex flex-row lg:justify-between items-center gap-2 text-zinc-500 border-b border-dashed border-zinc-400 py-2'>
										<span>{data.day}</span>
										<span>{data.openningHours}</span>
									</li>
								))}
							</ul>
						</div>
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
								Send <span className='font-bold'>us a Message</span>
							</h4>
							<p className='text-zinc-600 text-base'>
								Feel free to ask any questions over the phone, or get in touch
								via our contact form below. Your message will be dispatched
								directly to our staff who will answer as soon as they can.
							</p>
							<div className='flex w-full items-center justify-start p-10 bg-zinc-100 my-10 '>
								<form className='bg-white flex flex-col w-full gap-4 p-4'>
									<div className='flex md:flex-row flex-col w-full gap-6'>
										<input
											type='test'
											placeholder='Full Name...'
											className='border py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
											required={true}
										/>
										<input
											type='test'
											placeholder='Subject...'
											className='border  py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
											required={true}
										/>
									</div>
									<div className='flex flex-col md:flex-row w-full gap-6'>
										<input
											type='email'
											placeholder='Enter your Email...'
											className='border py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
											required={true}
										/>
										<input
											type='test'
											placeholder='Phone Number...'
											className='border  py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
											required={true}
										/>
									</div>
									<div className='flex w-full'>
										<textarea
											className='outline-none w-full border focus:border-zinc-400 py-3 px-4 h-40 resize-none'
											placeholder='Write a Message.....'></textarea>
									</div>
									<div className='flex w-full justify-end'>
										<button
											className='rounded-full py-4 px-6 bg-purple-800 hover:bg-purple-900 transition-all font-bold text-zinc-50'
											type='submit'>
											Send Message
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className='grid md:grid-cols-2 p-4'></div>
			</ContentWrapper>
		</div>
	);
}