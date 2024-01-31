/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { signup, SignupState } from '@/actions/auth-actions';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SignupForm() {
	// password matching input
	const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [confirmPassword, setConfirmPassword] = useState<string | undefined>(
		undefined,
	);
	const [name, setName] = useState<string | undefined>(undefined);

	const [email, setEmail] = useState<string | undefined>(undefined);

	// check passowrd equal
	const check_password_equal = () => {
		if (password === confirmPassword) {
			setPasswordMatch(true);
		} else {
			setPasswordMatch(false);
		}
	};

	const initialState: SignupState = {
		errors: {},
		message: null,
		errorMessage: null,
	};

	// form state
	const [state, dispatch] = useFormState(signup, initialState);
	const { pending } = useFormStatus();

	// local state of form
	const [localState, setLocalState] = useState<SignupState>(initialState);

	// set local state
	useEffect(() => {
		setLocalState(state);

		if (state.message !== '') {
			setName('');
			setEmail('');
			setPassword('');
			setConfirmPassword('');
		}
	}, [state]);

	return (
		<form action={dispatch} className='w-full p-10 md:p-0 md:w-[450px] mx-auto'>
			<h1 className='text-3xl font-bold text-center mb-10'>
				Registration for discount
			</h1>
			{localState.errorMessage && (
				<h2 className='mb-3 text-center p-2 bg-red-100 text-red-400 rounded-xl'>
					{localState.errorMessage}
				</h2>
			)}
			{localState.message && (
				<h2 className='mb-3 text-center p-2 bg-green-100 text-green-500 rounded-xl'>
					{localState.message}
					<Link href={'/login'} className='text-blue-500 underline ml-2'>
						Login
					</Link>
				</h2>
			)}
			<div className='w-full flex flex-row gap-4 mb-4'>
				<Input
					type='text'
					name='name'
					placeholder='Enter your name...'
					className='w-full'
					value={name}
					onChange={(e) => {
						setLocalState(initialState);
						setName(e.target.value);
					}}
					required
				/>
				{localState.errors?.name?.map((error) => (
					<p className='font-light  text-sm text-red-500 px-1' key={error}>
						{error}
					</p>
				))}
			</div>
			<div className='flex flex-col mb-4'>
				<Input
					type='email'
					name='email'
					placeholder='Enter your email...'
					className='w-full'
					value={email}
					onChange={(e) => {
						setLocalState(initialState);
						setEmail(e.target.value);
					}}
					required
				/>
				{localState.errors?.email?.map((error) => (
					<p className='font-light text-sm text-red-500 px-1' key={error}>
						{error}
					</p>
				))}
			</div>
			<div className='flex flex-col mb-4'>
				<Input
					type='password'
					name='password'
					value={password}
					placeholder='Create password...'
					required
					className={cn(
						'w-full',
						!passwordMatch ? 'border-red-500' : 'border-zinc-200',
					)}
					onChange={(e) => {
						setPassword(e.target.value);
						setLocalState(initialState);
					}}
					onKeyDown={(e) => {
						check_password_equal();
					}}
					onKeyUp={() => {
						check_password_equal();
					}}
				/>
				{localState.errors?.password?.map((error) => (
					<p className='font-light  text-sm text-red-500 px-1' key={error}>
						{error}
					</p>
				))}
			</div>
			<div className='flex flex-col'>
				<Input
					type='password'
					name='confirm-password'
					placeholder='Re-type password...'
					value={confirmPassword}
					required
					className={cn(
						'w-full mb-4',
						!passwordMatch ? 'border-red-400' : 'border-zinc-200',
					)}
					onChange={(e) => {
						setConfirmPassword(e.target.value);
						setLocalState(initialState);
					}}
					onKeyDown={(e) => {
						check_password_equal();
					}}
					onKeyUp={() => {
						check_password_equal();
					}}
				/>
				{localState.errors?.confirmPassword?.map((error: string) => (
					<p className='font-light  text-sm text-red-500 px-1' key={error}>
						{error}
					</p>
				))}
			</div>

			<Button type='submit' className='w-full' aria-disabled={pending}>
				Signup
			</Button>
			<div className='flex w-full mt-2'>
				<p className='text-center w-full'>
					Already have an account?
					<Link className='text-blue-500' href={'/login'}>
						Login
					</Link>
				</p>
			</div>
		</form>
	);
}
