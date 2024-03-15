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
		setMemberType(UsersType.client);
		setTimeout(() => {
			setFormStateMessage(undefined);
		}, 30000);
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
			<DialogContent className='max-w-full md:max-w-[500px] max-h-[100vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle className='text-center'>Add new user</DialogTitle>
				</DialogHeader>
				<form action={dispatch} className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='col-span-4'>
							Name
						</Label>
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
						<Label htmlFor='email' className='col-span-4'>
							Email
						</Label>
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
						<Label htmlFor='password' className='col-span-4'>
							Password
						</Label>
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
									<SelectItem value={UsersType['team-onboard']}>
										{UsersType['team-onboard']}
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
						<Label htmlFor='designation' className='col-span-4'>
							Member Position
						</Label>
						{memberType === UsersType['team-member'] ? (
							<Input
								id='designation'
								type='text'
								name='designation'
								className='col-span-4'
								placeholder='Designation....'
							/>
						) : (
							<Input
								id='designation'
								type='text'
								name='designation'
								defaultValue='None'
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
						<Label htmlFor='education' className='col-span-4'>
							Educational qualification
						</Label>
						{memberType === UsersType['team-member'] ? (
							<Input
								id='education'
								type='text'
								name='education'
								className='col-span-4'
								placeholder='Education....'
							/>
						) : (
							<Input
								id='education'
								type='text'
								name='education'
								defaultValue='None'
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
						<Label htmlFor='description' className='col-span-4'>
							Member Summary
						</Label>
						<Textarea
							id='description'
							name='description'
							defaultValue='None'
							placeholder='Provide User summary'
							className='col-span-4'
						/>
					</div>
					<div className={cn(' grid-cols-4 items-center gap-4', 'grid')}>
						<Label htmlFor='avatar' className='col-span-4'>
							Member Image
						</Label>
						<Label htmlFor='avatar' className='col-span-4'>
							Upload Profile image (Image must be less than 10 MB)
						</Label>
						<Input
							id='avatar'
							type='file'
							name='avatar'
							placeholder='Upload user avatar'
							className='col-span-4'
						/>
					</div>
					<div className='flex items-center gap-4 md:gap-5 justify-center'>
						<Button type='submit'>Create</Button>
						<Button
							variant='secondary'
							type='button'
							onClick={() => setModalOpen(!modalOpen)}>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
