/** @format */

import React from 'react';

export default function ContactForm() {
	return (
		<form className='bg-white flex flex-col w-full gap-4 p-4'>
			<div className='flex md:flex-row flex-col w-full gap-6'>
				<input
					type='test'
					placeholder='Full Name...'
					className='border py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
					required={true}
				/>
				<input
					type='test'
					placeholder='Subject...'
					className='border  py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
					required={true}
				/>
			</div>
			<div className='flex flex-col md:flex-row w-full gap-6'>
				<input
					type='email'
					placeholder='Enter your Email...'
					className='border py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
					required={true}
				/>
				<input
					type='test'
					placeholder='Phone Number...'
					className='border  py-3 px-4 flex-1 outline-none focus:border-zinc-400 bg-zinc-50'
					required={true}
				/>
			</div>
			<div className='flex w-full'>
				<textarea
					className='outline-none w-full border focus:border-zinc-400 py-3 px-4 h-40 resize-none'
					placeholder='Write a Message.....'></textarea>
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
