/** @format */

import { ContactType } from '@/lib/definitions';
import { ContactData, SocialLinks } from '@/lib/static_data';
import Link from 'next/link';
import React from 'react';
import SocialLinkCreator from '../common/social-link';

export default function ContactInfo() {
	return (
		<div className='w-full'>
			<div className='bg-purple-900 rounded-sm p-8 w-full flex flex-col'>
				<div className='flex flex-col items-start justify-center text-zinc-200 '>
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
				<div className='flex flex-col items-start justify-center text-zinc-200 '>
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
				<div className='flex flex-col items-start justify-center text-zinc-200  '>
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
				<div className='flex flex-col items-start justify-center text-zinc-200   '>
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
		</div>
	);
}
