/** @format */

'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { Appointment } from './columns';
import { DialogClose } from '@radix-ui/react-dialog';

export default function AppointmentDetails({
	appointment,
}: {
	appointment: Appointment;
}) {
	let service_name = '';

	appointment.services.forEach((service) => {
		if (service.id === appointment.selected_service) {
			service_name = service.name;
		}
	});

	const printHandler = () => {
		const printArea = document.getElementById(
			String(appointment.id),
		)?.innerHTML;
		const w = window.open('', 'new div', 'height=400,width=600');
		w?.document.write('<!doctype html><html><head><title></title>');

		w?.document.write('</head><body>');
		w?.document.write(printArea!);
		w?.document.write('</body> </html>');
		w?.print();
		w?.close();
	};
	return (
		<Dialog>
			<DialogTrigger className='bg-green-600 py-2 px-4 rounded-md text-white'>
				View
			</DialogTrigger>
			<DialogContent className='max-w-[95%] md:max-w-[500px] flex flex-col p-10'>
				<div className='w-full' id={String(appointment.id)}>
					<h1 className='text-center text-2xl pb-10'>Appointment Details</h1>
					<div className='flex flex-col'>
						<span className='text-zinc-600 text-sm'>Patient Name:</span>{' '}
						<p className='p-2'>{appointment.patient_name}</p>
					</div>
					<div className='flex flex-col'>
						<span className='text-zinc-600 text-sm'>Contact Number:</span>{' '}
						<p className='p-2'>{appointment.contact_number}</p>
					</div>
					{appointment.contact_email && (
						<div className='flex flex-col'>
							<span className='text-zinc-600 text-sm'>Contact Number:</span>{' '}
							<p className='p-2'>{appointment.contact_email}</p>
						</div>
					)}
					<div className='flex flex-col'>
						<span className='text-zinc-600 text-sm'>Appointment Date:</span>{' '}
						<p className='p-2'>{appointment.appointment_date}</p>
					</div>
					<div className='flex flex-col'>
						<span className='text-zinc-600 text-sm'>Appointment Time:</span>{' '}
						<p className='p-2'>{appointment.appointment_time}</p>
					</div>
					<div className='flex flex-col'>
						<span className='text-zinc-600 text-sm'>Selected Service:</span>{' '}
						<p className='p-2'>{service_name}</p>
					</div>
					{appointment.message && (
						<div className='flex flex-col'>
							<span className='text-zinc-600 text-sm'>Message:</span>{' '}
							<p className='p-2'>{appointment.message}</p>
						</div>
					)}
				</div>
				<div className='flex items-center justify-center'>
					<Button onClick={printHandler}>Print</Button>
					<DialogClose className='py-2 px-3 bg-zinc-50'>Close</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
