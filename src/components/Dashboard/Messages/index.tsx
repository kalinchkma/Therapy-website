/** @format */

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { getMessages } from '@/methods/message-method';
import React from 'react';
import ViewMessage from './view-message';
import DeleteMessage from './delete-message';

export default async function ManageMessage() {
	const messages = await getMessages();
	return (
		<div className='w-full'>
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Subject</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Message</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{messages.map((message, index) => (
						<TableRow key={index}>
							<TableCell>{message.name}</TableCell>
							<TableCell>{message.subject}</TableCell>
							<TableCell>{message.phone}</TableCell>
							<TableCell>{message.email}</TableCell>
							<TableCell className='max-w-[200px]'>
								<p className='line-clamp-2'>{message.message}</p>
							</TableCell>
							<TableCell>
								<div className=' flex flex-wrap gap-1'>
									<ViewMessage message={message} />
									<DeleteMessage id={message.id} />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
