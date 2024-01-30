/** @format */
'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
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

export default function AddNewUser({ label }: { label: string }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='capitalize px-4 py-2 bg-blue-600 hover:bg-blue-400 hover:text-white text-white ml-2 rounded-md'>
					{label}
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='text-center'>Add new user</DialogTitle>
				</DialogHeader>
				<form className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Input
							id='name'
							type='text'
							name='name'
							className='col-span-4'
							placeholder='Enter a name...'
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Input
							id='email'
							type='email'
							name='email'
							className='col-span-4'
							placeholder='Enter a email....'
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Input
							id='password'
							type='password'
							name='password'
							className='col-span-4'
							placeholder='Create password....'
						/>
					</div>
					<div className='flex w-full items-center justify-end'>
						<Select>
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
				</form>
				<DialogFooter>
					<Button type='submit'>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
