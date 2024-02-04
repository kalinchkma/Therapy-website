/** @format */
'use client';
import React, { useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
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

export default function AppointmentForm() {
	const [date, setDate] = React.useState<Date>();

	useEffect(() => {
		console.log(date);
	}, [date]);

	return (
		<form className='w-full flex flex-col bg-zinc-100 p-6 lg:p-10 rounded-md gap-5'>
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
				<Input
					id='name'
					name='name'
					type='text'
					placeholder='Enter your name....'
					className='w-full'
					required
				/>
			</div>
			{/* contect number input */}
			<div className='flex flex-col'>
				<Label htmlFor='email' className='text-base mb-2 text-zinc-500'>
					Enter your content number
				</Label>
				<Input
					id='email'
					name='email'
					type='email'
					placeholder='Enter contact number.....'
					className='w-full'
					required
				/>
			</div>
			{/* email input */}
			<div className='flex flex-col'>
				<Label htmlFor='email' className='text-base mb-2 text-zinc-500'>
					Enter your email (optional)
				</Label>
				<Input
					id='email'
					name='email'
					type='email'
					placeholder='Enter your email....'
					className='w-full'
				/>
			</div>

			{/* appointment type */}
			<div className='flex flex-col'>
				<Label htmlFor='email' className='text-base mb-2 text-zinc-500'>
					Select Appointment
				</Label>
				<Select>
					<SelectTrigger className='flex-grow'>
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
								{date ? format(date, 'PPP') : <span>Pick a date</span>}
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
					<Select>
						<SelectTrigger className='w-[200px]'>
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
					className='w-full h-[200px] max-h-[400px]'
				/>
			</div>
			{/* action box */}
			<div className='flex justify-end'>
				<button
					className='rounded-full py-4 px-6 bg-purple-800 hover:bg-purple-900 transition-all font-bold text-zinc-50'
					type='submit'>
					Send Message
				</button>
			</div>
		</form>
	);
}
