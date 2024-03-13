/** @format */

import React from 'react';
import SocialLinkCreator from '../common/social-link';

import { ContactData, SocialLinks } from '@/lib/static_data';
import IconCreator from '../common/icon-creator';
import { ContactType, IconType } from '@/lib/definitions';
import SocialLinkCreator2 from '../common/social-link-2';

export default function ContactLink({
	informations,
}: {
	informations: {
		id: number;
		openning_hours: unknown;
		emails: string;
		location: string;
		contact_numbers: string;
		social_links: unknown;
		logo: string;
		website_name: string;
		product_shipping_charge: unknown;
	}[];
}) {
	const contact_mail = informations[0].emails.split(',');
	const contact_numbers = informations[0].contact_numbers.split(',');
	const location = informations[0].location;
	const social_links = JSON.parse(String(informations[0].social_links)) as {
		Facebook?: string;
		Instagram?: string;
		Twitter?: string;
		LinkedIn?: string;
		YouTube?: string;
	};

	return (
		<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6'>
			<div className='col-span-1 flex items-center md:items-end h-full w-full'>
				<ul className='flex gap-3 '>
					{social_links.Facebook && (
						<li>
							<SocialLinkCreator2
								title='facebook'
								link={social_links.Facebook}
								className='text-zinc-200 text-3xl hover:text-zinc-100 transition-colors'
							/>
						</li>
					)}
					{social_links.Instagram && (
						<li>
							<SocialLinkCreator2
								title='instagram'
								link={social_links.Instagram}
								className='text-zinc-200 text-3xl hover:text-zinc-100 transition-colors'
							/>
						</li>
					)}
					{social_links.LinkedIn && (
						<li>
							<SocialLinkCreator2
								title='linkedin'
								link={social_links.LinkedIn}
								className='text-zinc-200 text-3xl hover:text-zinc-100 transition-colors'
							/>
						</li>
					)}
					{social_links.Twitter && (
						<li>
							<SocialLinkCreator2
								title='Twitter'
								link={social_links.Twitter}
								className='text-zinc-200 text-3xl hover:text-zinc-100 transition-colors'
							/>
						</li>
					)}
					{social_links.YouTube && (
						<li>
							<SocialLinkCreator2
								title='youtube'
								link={social_links.YouTube}
								className='text-zinc-200 text-3xl hover:text-zinc-100 transition-colors'
							/>
						</li>
					)}
				</ul>
			</div>

			{/* location */}
			{location && (
				<div className='col-span-1'>
					<div className='w-full flex flex-row gap-3'>
						<div className='text-zinc-200'>
							<IconCreator icon={IconType.Location} className='h-10 w-10' />
						</div>
						<div className='flex flex-col flex-grow'>
							<h6 className='text-zinc-200 font-extrabold text-base'>
								Visit Us
							</h6>
							<p className='text-zinc-200'>{location}</p>
						</div>
					</div>
				</div>
			)}

			{/* Mail */}
			{contact_mail.length > 0 && (
				<div className='col-span-1 lg:ml-8'>
					<div className='w-full flex flex-row gap-3'>
						<div className='text-zinc-200'>
							<IconCreator icon={IconType.Email} className='h-10 w-10' />
						</div>
						<div className='flex flex-col flex-grow'>
							<h6 className='text-zinc-200 font-extrabold text-base'>
								Mail Us
							</h6>
							{contact_mail.map((email) => (
								<p className='text-zinc-200' key={email}>
									{email}
								</p>
							))}
						</div>
					</div>
				</div>
			)}
			{/* Phone number */}
			{contact_numbers.length > 0 && (
				<div className='col-span-1'>
					<div className='w-full flex flex-row gap-3'>
						<div className='text-zinc-200 flex items-start'>
							<IconCreator icon={IconType.Contact} className='h-10 w-10' />
						</div>
						<div className='flex flex-col flex-grow'>
							<h6 className='text-zinc-200 font-extrabold text-base'>
								Call Us
							</h6>
							{contact_numbers.map((number) => (
								<p className='text-zinc-200' key={number}>
									{number}
								</p>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
