/** @format */
'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { UsersType } from '@/lib/definitions';
import { createNewUser, UserCreateState } from '@/actions/users-actions';
import { useFormState, useFormStatus } from 'react-dom';

import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

export default function AddNewUser({ label }: { label: string }) {
	const initialState: UserCreateState | undefined = undefined;

	const [state, dispatch] = useFormState(createNewUser, initialState);

	const [modalOpen, setModalOpen] = useState(false);

	const [formStateMessage, setFormStateMessage] = useState<
		string | undefined
	>();

	const [memberType, setMemberType] = useState<UsersType>(UsersType.client);

	useEffect(() => {
		setModalOpen(false);
		setFormStateMessage(state?.message!);
		// setTimeout(() => {
		// 	setFormStateMessage(undefined);
		// }, 90000);
	}, [state]);

	return (
		<Dialog open={modalOpen}>
			<Button
				onClick={() => setModalOpen(!modalOpen)}
				variant='outline'
				className='capitalize px-4 py-2 bg-blue-600 hover:bg-blue-400 hover:text-white text-white mx-2 rounded-md'>
				{label}
			</Button>
			{state &&
				formStateMessage &&
				(state.error === true ? (
					<span className='py-2 px-4 bg-red-100 flex items-center justify-center rounded-sm'>
						Error: {formStateMessage}
					</span>
				) : (
					<span className='py-2 px-4 bg-green-100 flex items-center justify-center rounded-sm'>
						{formStateMessage}
					</span>
				))}
			<DialogContent className='max-w-full md:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle className='text-center'>Add new user</DialogTitle>
				</DialogHeader>
				<form action={dispatch} className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Input
							id='name'
							type='text'
							name='name'
							className='col-span-4'
							placeholder='Enter a name...'
							required
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Input
							id='email'
							type='email'
							name='email'
							className='col-span-4'
							placeholder='Enter a email....'
							required
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Input
							id='password'
							type='password'
							name='password'
							className='col-span-4'
							placeholder='Create password....'
							required
						/>
					</div>
					<div className='flex w-full items-center justify-end'>
						<Select
							name='user-type'
							onValueChange={(e) => {
								setMemberType(e as UsersType);
							}}
							required>
							<SelectTrigger className='w-full ml-auto'>
								<SelectValue placeholder='Select a User Type' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>User Type</SelectLabel>

									<SelectItem value={UsersType.admin}>
										{UsersType.admin}
									</SelectItem>
									<SelectItem value={UsersType.client}>
										{UsersType.client}
									</SelectItem>
									<SelectItem value={UsersType['team-member']}>
										{UsersType['team-member']}
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div
						className={cn(
							'hidden grid-cols-4 items-center gap-4',
							memberType === UsersType['team-member'] && 'grid',
						)}>
						{memberType === UsersType['team-member'] ? (
							<Input
								type='text'
								name='member-type'
								className='col-span-4'
								placeholder='Team member type....'
							/>
						) : (
							<Input
								type='text'
								name='member-type'
								value={'None'}
								className='col-span-4'
								placeholder='Team member type....'
							/>
						)}
					</div>

					<div
						className={cn(
							'hidden grid-cols-4 items-center gap-4',
							memberType === UsersType['team-member'] && 'grid',
						)}>
						{memberType === UsersType['team-member'] ? (
							<Input
								type='text'
								name='designation'
								className='col-span-4'
								placeholder='Designation....'
							/>
						) : (
							<Input
								type='text'
								name='designation'
								value='None'
								className='col-span-4'
								placeholder='Designation....'
							/>
						)}
					</div>
					<div
						className={cn(
							'hidden grid-cols-4 items-center gap-4',
							memberType === UsersType['team-member'] && 'grid',
						)}>
						{memberType === UsersType['team-member'] ? (
							<Input
								type='text'
								name='education'
								className='col-span-4'
								placeholder='Education....'
							/>
						) : (
							<Input
								type='text'
								name='education'
								value='None'
								className='col-span-4'
								placeholder='Education....'
							/>
						)}
					</div>
					<div
						className={cn(
							'hidden grid-cols-4 items-center gap-4',
							memberType === UsersType['team-member'] && 'grid',
						)}>
						<Textarea
							name='description'
							placeholder='Provide User summary'
							className='col-span-4'
						/>
					</div>
					<div className='flex items-center gap-4 md:gap-5 justify-center'>
						<Button type='submit'>Create</Button>
						<Button
							variant='secondary'
							onClick={() => setModalOpen(!modalOpen)}>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
