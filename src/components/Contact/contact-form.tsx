/** @format */
'use client';

import {
	SendMessageFormState,
	sendMessage,
} from '@/actions/send-message-actions';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';

export default function ContactForm() {
	const initialState: SendMessageFormState = { status: 100 };
	const [state, dispatch] = useFormState(sendMessage, initialState);
	useEffect(() => {
		if (state.status === 200) {
			(document.getElementById('message-form') as HTMLFormElement).reset();
		}
	}, [state]);
	return (
		<form
			className='bg-white flex flex-col w-full gap-4 p-4'
			action={dispatch}
			id='message-form'>
			{state.status === 200 && state.message && (
				<h4 className='text-green-500 text-center'>{state.message}</h4>
			)}
			{state.status === 500 && state.message && (
				<h4 className='text-red-500 text-center'>{state.message}</h4>
			)}
			<div className='flex md:flex-row flex-col w-full gap-6'>
				<div className='flex flex-col flex-grow'>
					<input
						type='test'
						placeholder='Enter your name...'
						name='name'
						className='border py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
						required={true}
					/>
					{state.errors?.name && (
						<p className='text-red-400'>{state.errors.name[0]}</p>
					)}
				</div>
				<div className='flex flex-col flex-grow'>
					<input
						type='test'
						placeholder='Subject...'
						name='subject'
						className='border w-full py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
						required={true}
					/>
					{state.errors?.subject && (
						<p className='text-red-400'>{state.errors.subject[0]}</p>
					)}
				</div>
			</div>
			<div className='flex flex-col md:flex-row w-full gap-6'>
				<div className='flex flex-col flex-grow'>
					<input
						type='email'
						name='email'
						placeholder='Enter your Email...'
						className='border py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
						required={true}
					/>
					{state.errors?.email && (
						<p className='text-red-400'>{state.errors.email[0]}</p>
					)}
				</div>
				<div className='flex flex-col flex-grow'>
					<input
						type='test'
						placeholder='Phone Number...'
						name='phone-number'
						className='border  py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
						required={true}
					/>
					{state.errors?.phone_number && (
						<p className='text-red-400'>{state.errors.phone_number[0]}</p>
					)}
				</div>
			</div>
			<div className='flex flex-col w-full'>
				<textarea
					name='message'
					className='outline-none w-full border focus:border-zinc-400 py-3 px-4 h-40 resize-none'
					placeholder='Write a Message.....'
				/>
				{state.errors?.message && (
					<p className='text-red-400'>{state.errors.message[0]}</p>
				)}
			</div>
			<div className='flex w-full justify-end'>
				<button
					className='rounded-full py-4 px-6 bg-purple-800 hover:bg-purple-900 transition-all font-bold text-zinc-50'
					type='submit'>
					Send Message
				</button>
			</div>
		</form>
	);
}
