/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/actions/auth_actions';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function LoginForm() {
	// form state
	const [errorMessage, dispatch] = useFormState(login, undefined);
	const { pending } = useFormStatus();

	return (
		<form action={dispatch} className='w-full p-10 md:p-0 md:w-[450px] mx-auto'>
			<h1 className='text-3xl font-bold text-center mb-8'>Login</h1>
			{errorMessage && (
				<h2 className='mb-3 text-center p-2 bg-red-100 text-red-500 rounded-xl'>
					Invalid users credentials
				</h2>
			)}
			<div className='flex flex-col mb-4'>
				<Input
					type='email'
					name='email'
					placeholder='Enter your email...'
					className='w-full'
					required
				/>
			</div>
			<div className='flex flex-col mb-4'>
				<Input
					type='password'
					name='password'
					placeholder='Password...'
					required
					className={cn('w-full')}
				/>
			</div>
			<Button type='submit' className='w-full' aria-disabled={pending}>
				Login
			</Button>
			<div className='flex w-full mt-2'>
				<p className='text-center w-full'>
					Don&apos;t have an account?
					<Link className='text-blue-500' href={'/signup'}>
						Signup
					</Link>
				</p>
			</div>
		</form>
	);
}
