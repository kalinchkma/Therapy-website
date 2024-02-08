/** @format */
'use client';

import {
	updateContact,
	updateEmail,
	updateLocation,
	updateWebsiteLogo,
	updateWebsiteName,
} from '@/actions/information-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useFormState } from 'react-dom';

export default function UpdateInformation({
	information,
}: {
	information: {
		logo: string;
		location: string;
		id: number;
		openning_hours: unknown;
		emails: string;
		contact_numbers: string;
		social_links: unknown;
		website_name: string;
	}[];
}) {
	// update log
	const update_logo = updateWebsiteLogo.bind(null, Number(information[0].id));

	const [logo_state, dispatch_logo_state] = useFormState(
		update_logo,
		undefined,
	);

	// update web information
	const update_websitename = updateWebsiteName.bind(
		null,
		Number(information[0].id),
	);

	const [update_websitename_state, dispatch_websitename_state] = useFormState(
		update_websitename,
		undefined,
	);
	// update location
	const update_location = updateLocation.bind(null, information[0].id);
	const [update_location_state, dipatch_update_location_state] = useFormState(
		update_location,
		undefined,
	);

	// update Emails
	const update_emails = updateEmail.bind(null, information[0].id);
	const [update_emails_state, dispatch_update_emails_state] = useFormState(
		update_emails,
		undefined,
	);

	// update contacts
	const update_contacts = updateContact.bind(null, information[0].id);

	const [update_contacts_state, dispatch_update_contacts_state] = useFormState(
		update_contacts,
		undefined,
	);

	return (
		<div className='w-full grid'>
			<h1 className='text-xl font-bold flex items-center justify-center border-b mb-5'>
				Website Information
			</h1>
			{/* Logo */}
			<form
				className='w-full flex flex-col gap-2 mb-4'
				action={dispatch_logo_state}>
				<Label className='text-lg'>
					Website logo (Image file must be less than 10MB)
				</Label>
				{information[0].logo && (
					<Image
						src={information[0].logo}
						width='300'
						height='300'
						alt='Website logo'
					/>
				)}
				<Input type='file' name='logo' className='cursor-pointer' />
				{logo_state && <p className='text-red-400'>{logo_state}</p>}
				<div className='flex items-center justify-end'>
					<Button
						type='submit'
						size='icon'
						className='bg-blue-600 hover:bg-blue-500'>
						<Upload />
					</Button>
				</div>
			</form>

			{/* Website name */}
			<form
				className='w-full flex flex-col gap-2 mb-4'
				action={dispatch_websitename_state}>
				<Label htmlFor='website-name' className='text-lg'>
					Website name
				</Label>
				<div className='flex items-center justify-start gap-2'>
					<Input
						id='website-name'
						name='website-name'
						defaultValue={information[0].website_name}
					/>
					{update_websitename_state && (
						<p className='text-red-400'>{update_websitename_state}</p>
					)}
					<Button
						type='submit'
						size='icon'
						className='bg-blue-600 hover:bg-blue-500'>
						<UploadCloud />
					</Button>
				</div>
			</form>
			{/* location */}
			<form
				className='w-full flex flex-col gap-2 mb-4'
				action={dipatch_update_location_state}>
				<Label htmlFor='location' className='text-lg'>
					Location
				</Label>
				<Textarea
					id='location'
					name='location'
					defaultValue={information[0].location}
				/>
				{update_location_state && (
					<p className='text-red-400'>{update_location_state}</p>
				)}
				<div className='flex items-center justify-end'>
					<Button
						type='submit'
						size='icon'
						className='bg-blue-600 hover:bg-blue-500'>
						<Upload />
					</Button>
				</div>
			</form>
			{/* emails */}
			<form
				className='w-full flex flex-col gap-2 mb-4'
				action={dispatch_update_emails_state}>
				<Label htmlFor='email' className='text-lg'>
					Emails (Please provide emails with &apos;,&apos;)
				</Label>
				<div className='flex items-center justify-start gap-2'>
					<Input id='email' name='email' defaultValue={information[0].emails} />
					{update_emails_state && (
						<p className='text-red-400'>{update_emails_state}</p>
					)}
					<Button
						type='submit'
						size='icon'
						className='bg-blue-600 hover:bg-blue-500'>
						<Upload />
					</Button>
				</div>
			</form>

			{/* contact */}
			<form
				className='w-full flex flex-col gap-2 mb-4'
				action={dispatch_update_contacts_state}>
				<Label htmlFor='contacts' className='text-lg'>
					Contacts
				</Label>

				<div className='flex items-center justify-start gap-2'>
					<Input
						id='contacts'
						name='contacts'
						defaultValue={information[0].contact_numbers}
					/>
					{update_contacts_state && (
						<p className='text-red-400'>{update_contacts_state}</p>
					)}
					<Button
						type='submit'
						size='icon'
						className='bg-blue-600 hover:bg-blue-500'>
						<Upload />
					</Button>
				</div>
			</form>
		</div>
	);
}
