/** @format */
'use client';
import React, { useEffect } from 'react';
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
import { makeAppointment } from '@/actions/appointment-actions';

export default function AppointmentForm() {
	const [date, setDate] = React.useState<Date>();

	return (
		<form
			className='w-full flex flex-col bg-zinc-100 p-6 lg:p-10 rounded-md gap-5'
			action={makeAppointment}>
			{/* Form header */}
			<div className='flex items-center justify-center mb-0'>
				<h2 className='text-2xl uppercase text-blue-950 font-bold'>
					Appointment Form
				</h2>
			</div>
			{/* name input */}
			<div className=' flex flex-col'>
				<Label htmlFor='name' className='text-base mb-2 text-zinc-500'>
					Enter your name
				</Label>
				<input
					id='name'
					name='name'
					type='text'
					placeholder='Enter your name....'
					className='border py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
					required
				/>
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
			</div>

			{/* appointment type */}
			<div className='flex flex-col'>
				<Label htmlFor='email' className='text-base mb-2 text-zinc-500'>
					Select Appointment
				</Label>
				<Select name='service'>
					<SelectTrigger className='border py-2 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50 ring-transparent focus:ring-transparent'>
						<SelectValue placeholder='Select Service' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Select Service</SelectLabel>
							<SelectItem value='terapy'>Therapy</SelectItem>
							<SelectItem value='injury'>Injury</SelectItem>
							<SelectItem value='massage'>Massage</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
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
									type='string'
									name='appointment-date'
									value={date ? String(format(date, 'PPP')) : 'Pick a date'}
									className='hover:cursor-pointer'
								/>
								{/* {date ? format(date, 'PPP') : <span>Pick a date</span>} */}
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
					<Select name='appointment-time'>
						<SelectTrigger className='w-[200px] border py-2 px-4  outline-none focus:border-zinc-400 bg-zinc-50 ring-transparent focus:ring-transparent'>
							<SelectValue placeholder='Select Time' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Select Time</SelectLabel>
								<SelectItem value='9am-10am'>9am-10am</SelectItem>
								<SelectItem value='10am-11am'>10am-11am</SelectItem>
								<SelectItem value='11am-12pm'>11am-12pm</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
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
					className=' focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 border py-3 px-4 outline-none focus:border-zinc-400 bg-zinc-50 w-full h-[200px] max-h-[400px]'
				/>
			</div>
			{/* action box */}
			<div className='flex justify-end'>
				<button
					className='rounded-full py-4 px-6 bg-purple-800 hover:bg-purple-900 transition-all font-bold text-zinc-50'
					type='submit'>
					Submit
				</button>
			</div>
		</form>
	);
}
