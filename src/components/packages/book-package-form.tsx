/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import {
	createAppointment,
	AppointmentState,
} from '@/actions/appointment-actions';
import { useFormState, useFormStatus } from 'react-dom';
import ActionButton from '../common/action-button';

type Information = {
	id: number;
	openning_hours: unknown;
	emails: string;
	location: string;
	contact_numbers: string;
	social_links: unknown;
	logo: string;
	website_name: string;
};

function Submit() {
	const { pending } = useFormStatus();
	return (
		<button
			className='rounded-full py-4 px-6 bg-purple-800 hover:bg-purple-900 transition-all font-bold text-zinc-50'
			type='submit'
			disabled={pending}>
			{pending ? 'Submitting...' : 'Submit'}
		</button>
	);
}

export default function BookPackageForm({
	p,
	information,
}: {
	p: {
		id: number;
		description: string;
		title: string;
		package_type: string;
		price: number;
		offers: number | null;
		moneyType: string | null;
		packageDetails: string;
	};
	information: Information;
}) {
	const [date, setDate] = React.useState<Date>();

	const openning_hours = JSON.parse(String(information.openning_hours)) as {
		Friday: string;
		Saturday: string;
		Sunday: string;
		Monday: string;
		Tuesday: string;
		Wednessday: string;
		Thursday: string;
	};

	let hours: String[] = [];

	if (openning_hours.Friday) {
		const service_hours = openning_hours.Friday.split('-');
		let start_hour = service_hours[0].match(/(\d+)/);
		let end_hour = service_hours[1].match(/(\d+)/);
		if (start_hour && end_hour) {
			for (let i = Number(start_hour[0]); i < Number(end_hour[0]) + 12; i++) {
				if (i > 12) {
					hours.push(String(i - 12) + ' pm');
				} else {
					hours.push(String(i) + ' am');
				}
			}
		}
	}

	const initialState: AppointmentState = { message: '', status: 100 };
	const make_appointment = createAppointment.bind(null, -1, 'package');

	const [make_appointment_state, dipatch_make_appointment_state] = useFormState(
		make_appointment,
		initialState,
	);

	const [formMessage, setFormMessage] = useState<string | undefined>();
	const [successState, setSuccessState] = useState<boolean>(false);

	useEffect(() => {
		setFormMessage(make_appointment_state.message);
		if (make_appointment_state.status === 200) {
			(document.getElementById('appointment-form') as HTMLFormElement).reset();
			setSuccessState(true);
			(document.getElementById('top-view') as HTMLDivElement).scrollIntoView({
				behavior: 'smooth',
			});
		}
	}, [make_appointment_state]);

	return (
		<>
			<div id='top-view'></div>
			{!successState ? (
				<form
					id='appointment-form'
					className='w-full flex flex-col bg-zinc-200 p-6 lg:p-10 rounded-md gap-5 shadow-2xl'
					action={dipatch_make_appointment_state}>
					{/* Form header */}
					<div className='flex flex-col items-center justify-center mb-0'>
						<h2 className='text-2xl uppercase text-blue-950 font-bold'>
							Book Package
						</h2>
						{make_appointment_state.status === 200 &&
							make_appointment_state.message && (
								<p className='text-green-500'>{formMessage}</p>
							)}
						{make_appointment_state.status === 500 &&
							make_appointment_state.message && (
								<p className='text-red-500'>{formMessage}</p>
							)}
					</div>
					{/* name input */}
					<div className=' flex flex-col'>
						<Label htmlFor='name' className='text-base mb-2 text-zinc-500'>
							Enter your name
						</Label>
						<input
							id='name'
							name='paitent-name'
							type='text'
							placeholder='Enter your name....'
							className='border py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
							required
						/>
						{make_appointment_state.status === 400 &&
							make_appointment_state.errors?.paitent_name && (
								<p className='text-red-400'>
									{make_appointment_state.errors.paitent_name[0]}
								</p>
							)}
					</div>
					{/* contect number input */}
					<div className='flex flex-col'>
						<Label
							htmlFor='contact-number'
							className='text-base mb-2 text-zinc-500'>
							Enter your content number
						</Label>

						<input
							id='contact-number'
							name='contact-number'
							type='text'
							placeholder='Enter contact number.....'
							className='border py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
							required
						/>
						{make_appointment_state.status === 400 &&
							make_appointment_state.errors?.contact_number && (
								<p className='text-red-400'>
									{make_appointment_state.errors.contact_number[0]}
								</p>
							)}
					</div>
					{/* email input */}
					<div className='flex flex-col'>
						<Label htmlFor='email' className='text-base mb-2 text-zinc-500'>
							Enter your email (optional)
						</Label>
						<input
							id='email'
							name='email'
							type='email'
							placeholder='Enter your email....'
							className='border py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
						/>
						{make_appointment_state.status === 400 &&
							make_appointment_state.errors?.email && (
								<p className='text-red-400'>
									{make_appointment_state.errors.email[0]}
								</p>
							)}
					</div>

					{/* appointment type */}
					<div className='flex flex-col'>
						<Label className='text-base mb-2 text-zinc-500'>
							Selected Package
						</Label>
						<input disabled className='py-2 px-4' defaultValue={p.title} />

						<input type='hidden' name='selected-service' value={p.id} />

						{make_appointment_state.status === 400 &&
							make_appointment_state.errors?.selected_service && (
								<p className='text-red-400'>
									{make_appointment_state.errors.selected_service[0]}
								</p>
							)}
					</div>
					{/* select time & date */}
					<div className='flex flex-col'>
						<Label className='text-base mb-2 text-zinc-500'>
							Select Date & Time
						</Label>
						<div className='flex flex-row flex-wrap gap-2'>
							{/* date selector */}
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={'outline'}
										className={cn(
											'w-[240px] justify-start text-left font-normal',
											!date && 'text-muted-foreground',
										)}>
										<CalendarIcon className='mr-2 h-4 w-4' />
										<input
											type='text'
											readOnly={true}
											required
											name='appointment-date'
											value={date ? String(format(date, 'PPP')) : ''}
											placeholder='Pick a date'
											className='text-zinc-800 hover:cursor-pointer'
										/>
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										mode='single'
										selected={date}
										onSelect={setDate}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							{/* select time */}
							<Select name='appointment-time' required>
								<SelectTrigger className='w-[200px] border py-2 px-4  outline-none focus:border-zinc-400 bg-zinc-50 ring-transparent focus:ring-transparent'>
									<SelectValue placeholder='Select Time' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Select Time</SelectLabel>
										{hours.map((hour, index) => (
											<SelectItem key={index} value={String(hour)}>
												{hour}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						{make_appointment_state.status === 400 &&
							make_appointment_state.errors?.appointment_date && (
								<p className='text-red-400 mt-4'>
									{make_appointment_state.errors.appointment_date[0]}
								</p>
							)}
						{make_appointment_state.status === 400 &&
							make_appointment_state.errors?.appointment_time && (
								<p className='text-red-400 mt-4'>
									{make_appointment_state.errors.appointment_time[0]}
								</p>
							)}
					</div>
					{/* message input */}
					<div className='flex flex-col'>
						<Label htmlFor='message' className='text-base mb-2 text-zinc-500'>
							Leave us message (optional)
						</Label>
						<Textarea
							id='message'
							name='message'
							placeholder='Leave us message....'
							className='focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border py-3 px-4 outline-none focus:border-zinc-400 bg-zinc-50 w-full h-[200px] max-h-[400px]'
						/>
						{make_appointment_state.status === 400 &&
							make_appointment_state.errors?.message && (
								<p className='text-red-400 mt-4'>
									{make_appointment_state.errors.message[0]}
								</p>
							)}
					</div>
					{/* action box */}
					<div className='flex justify-end'>
						<Submit />
					</div>
				</form>
			) : (
				<div className='w-full h-[500px] bg-zinc-100 flex flex-col items-center justify-center'>
					<h1 className='text-zinc-700 font-bold'>
						Successfully booked package{' '}
						<span className='text-blue-900'>{p.title}</span>
					</h1>
					<ActionButton title='Back' link='/packages' />
				</div>
			)}
		</>
	);
}
