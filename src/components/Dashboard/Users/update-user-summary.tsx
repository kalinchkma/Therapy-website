/** @format */

'use client';
import { updateUserSummary } from '@/actions/users-actions';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose, DialogDescription } from '@radix-ui/react-dialog';
import React from 'react';
import { useFormState } from 'react-dom';

export default function UpdateUserSummary({
	id,
	default_sum,
}: {
	id: number;
	default_sum: string;
}) {
	const update_summary = updateUserSummary.bind(null, Number(id));

	const [state, dispatch] = useFormState(update_summary, undefined);

	return (
		<Dialog>
			<DialogTrigger className='py-2 px-4 bg-green-700 text-zinc-100 rounded-sm'>
				View
			</DialogTrigger>

			<DialogContent className='flex items-center justify-center flex-col w-auto md:w-[500px]'>
				<DialogHeader>
					<DialogTitle className='text-center'>
						Change member summary
					</DialogTitle>
					{state?.success?.message && (
						<DialogDescription className='text-center text-green-500 bg-green-50'>
							{state.success.message}
						</DialogDescription>
					)}
					{state?.error?.message && (
						<DialogDescription className='text-center text-red-500 bg-red-50'>
							{state.error.message}
						</DialogDescription>
					)}
				</DialogHeader>

				<form className='w-full flex flex-col gap-3' action={dispatch}>
					<div className='w-full flex flex-col'>
						<Textarea
							defaultValue={default_sum}
							className='h-52'
							name='summary'
						/>
						{state?.error?.summary && (
							<p className='text-red-500 mt-3'>{state.error.summary}</p>
						)}
					</div>
					<div className='flex w-full items-end justify-end'>
						<Button variant='default' type='submit'>
							Update
						</Button>
						<DialogClose>
							<Button variant='secondary' type='button'>
								Cancel
							</Button>
						</DialogClose>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
