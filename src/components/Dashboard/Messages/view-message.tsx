/** @format */

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

export default function ViewMessage({
	message,
}: {
	message: {
		name: string;
		id: number;
		email: string | null;
		subject: string;
		message: string;
		phone: string | null;
	};
}) {
	return (
		<Dialog>
			<DialogTrigger className='py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md'>
				View
			</DialogTrigger>
			<DialogContent className='md:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Message Details</DialogTitle>
				</DialogHeader>
				<div className='w-full flex flex-col'>
					<h4>Name: {message.name}</h4>
					<h4>Subject: {message.subject}</h4>
					<h4>Phone Number: {message.phone}</h4>
					<h4>Email: {message.email}</h4>
					<h4>Message: {message.message}</h4>
				</div>
				<div className='flex items-center justify-center'>
					<DialogClose className='py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md'>
						Close
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
