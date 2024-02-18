/** @format */

import React from 'react';
import SocialLinkCreator from '../common/social-link';

import { ContactData, SocialLinks } from '@/lib/static_data';
import IconCreator from '../common/icon-creator';
import { ContactType } from '@/lib/definitions';

export default async function ContactLink() {
	return (
		<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6'>
			<div className='col-span-1 flex items-center md:items-end h-full w-full'>
				<ul className='flex gap-3 '>
					{SocialLinks.map((link) => (
						<li key={link.title + link.link}>
							<SocialLinkCreator
								icon={link.icon}
								link={link.link}
								className='text-zinc-400 text-3xl hover:text-zinc-200 transition-colors'
							/>
						</li>
					))}
				</ul>
			</div>
			{ContactData.filter(
				(contact) => contact.type === ContactType.Location,
			).map((contact) => (
				<div className='col-span-1' key={contact.title}>
					<div className='w-full flex flex-row gap-3'>
						<div className='text-zinc-400'>
							<IconCreator icon={contact.icon!} className='h-10 w-10' />
						</div>
						<div className='flex flex-col flex-grow'>
							{contact.location && contact.location && (
								<>
									<h6 className='text-zinc-400 font-extrabold text-base'>
										{contact.location?.title}
									</h6>
									<p className='text-zinc-500'>{contact.location.details}</p>
								</>
							)}
						</div>
					</div>
				</div>
			))}

			{ContactData.filter(
				(contact) => contact.type === ContactType.contact,
			).map((contact) => (
				<React.Fragment key={contact.title}>
					{contact.contact?.emails && (
						<div
							className='col-span-1 lg:ml-8'
							key={contact.contact.emails.title}>
							<div className='w-full flex flex-row gap-3'>
								<div className='text-zinc-400'>
									<IconCreator
										icon={contact.contact.emails.icon!}
										className='h-10 w-10'
									/>
								</div>
								<div className='flex flex-col flex-grow'>
									<h6 className='text-zinc-400 font-extrabold text-base'>
										{contact.contact.emails.title}
									</h6>
									{contact.contact.emails.data &&
										contact.contact.emails.data.map((email) => (
											<p className='text-zinc-500' key={email}>
												{email}
											</p>
										))}
								</div>
							</div>
						</div>
					)}

					{contact.contact?.phoneNumbers && (
						<div
							className='col-span-1'
							key={contact.contact.phoneNumbers.title}>
							<div className='w-full flex flex-row gap-3'>
								<div className='text-zinc-400'>
									<IconCreator
										icon={contact.contact.phoneNumbers.icon!}
										className='h-10 w-10'
									/>
								</div>
								<div className='flex flex-col flex-grow'>
									<h6 className='text-zinc-400 font-extrabold text-base'>
										{contact.contact.phoneNumbers.title}
									</h6>
									{contact.contact.phoneNumbers.data &&
										contact.contact.phoneNumbers.data.map((number) => (
											<p className='text-zinc-500' key={number}>
												{number}
											</p>
										))}
								</div>
							</div>
						</div>
					)}
				</React.Fragment>
			))}
		</div>
	);
}
