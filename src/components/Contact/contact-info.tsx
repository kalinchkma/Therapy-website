/** @format */

import { ContactType } from '@/lib/definitions';
import { ContactData, SocialLinks } from '@/lib/static_data';
import Link from 'next/link';
import React from 'react';
import SocialLinkCreator from '../common/social-link';

export default function ContactInfo({
	information,
}: {
	information: {
		id: number;
		openning_hours: unknown;
		emails: string;
		location: string;
		contact_numbers: string;
		social_links: unknown;
		logo: string;
		website_name: string;
	};
}) {
	return (
		<div className='w-full'>
			<div className='bg-purple-900 rounded-sm p-8 w-full flex flex-col'>
				<div className='flex flex-col items-start justify-center text-zinc-200 '>
					<h5 className='text-xl font-bold capitalize'>
						{/* Website name */}
						{information.website_name}
					</h5>
					{/* location */}
					<p className='text-zinc-300 text-base'>{information.location}</p>
				</div>
				{/* Contact numbers */}
				<div className='flex flex-col items-start justify-center text-zinc-200 '>
					<h5 className='text-xl font-bold capitalize'>Contact numbers</h5>
					<ul>
						{information.contact_numbers.split(',').map((contact) => (
							<li key={contact}>
								<p>{contact}</p>
							</li>
						))}
					</ul>
				</div>
				{/* Emails */}
				<div className='flex flex-col items-start justify-center text-zinc-200  '>
					<h5 className='text-xl font-bold capitalize'>Emails</h5>
					<ul>
						{information.emails.split(',').map((email) => (
							<li key={email}>
								<p>{email}</p>
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