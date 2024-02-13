/** @format */
'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cross, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { createServiceArea, FormState } from '@/actions/service-area-actions';

export default function AddNewServiceArea() {
	const [open, setOpen] = useState<boolean>(false);

	const [successState, setSuccessState] = useState<Boolean>(false);

	const [serviceArea, setServiceArea] = useState<{ data: string[] }>({
		data: [],
	});

	const initialState: FormState = { status: 100 };

	const [state, dispatch] = useFormState(createServiceArea, initialState);

	useEffect(() => {
		if (state.status === 200) {
			(document.getElementById('service-area-form') as HTMLFormElement).reset();
			setServiceArea({ data: [] });
			setSuccessState(true);
		}
	}, [state]);

	return (
		<Dialog open={open}>
			<Button
				onClick={() => {
					setOpen(true);
				}}
				className='bg-blue-600 text-white hover:bg-blue-500 flex py-2 px-4 rounded-sm text-lg gap-2'>
				Create new service area <Plus />
			</Button>
			<DialogContent className='max-w-full md:max-w-[600px]'>
				{successState ? (
					<div className='w-full py-5 flex flex-col'>
						{state.status === 200 && (
							<p className='text-green-400 text-center'>{state.message}</p>
						)}
						<div className='flex items-center justify-center mt-2'>
							<Button
								type='button'
								onClick={() => {
									setSuccessState(false);
								}}>
								Create New one
							</Button>
							<Button
								type='button'
								onClick={() => {
									setOpen(false);
									setSuccessState(false);
								}}
								className='py-2 px-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'>
								Cancel
							</Button>
						</div>
					</div>
				) : (
					<form
						className='flex flex-col'
						action={dispatch}
						id='service-area-form'>
						<h1 className='text-center font-bold text-lg md:text-2xl border-b py-4'>
							Create new service area
						</h1>
						{state.status === 500 && (
							<p className='text-red-400 mb-3 text-center'>{state.message}</p>
						)}

						{/* e------------------------ */}
						<div className='flex flex-col gap-2 mb-3 mt-3'>
							<Label htmlFor='service-name' className='text-zinc-700 text-md'>
								Enter Service Area
							</Label>
							<Input
								type='text'
								name='service-area-name'
								id='service-name'
								placeholder='Service name area...'
								required
							/>
							{state.errors?.service_area_name && (
								<p className='text-red-500'>
									{state.errors.service_area_name[0]}
								</p>
							)}
						</div>
						{/* e------------------------ */}
						<div className='flex flex-col gap-2 mb-3'>
							<Label
								htmlFor='service-area-list'
								className='text-zinc-700 text-md'>
								Service Area List
							</Label>
							<div className='flex flex-col p-1'>
								{serviceArea.data &&
									serviceArea.data.map((area, index) => (
										<p className='text-blue-600 text-sm' key={index}>
											{area}
										</p>
									))}
								{serviceArea.data && serviceArea.data.length > 0 && (
									<Button
										className='mt-2'
										onClick={() => {
											setServiceArea({ data: [] });
										}}>
										<Trash2 />
									</Button>
								)}
							</div>
							<div className='flex gap-2'>
								<Input
									type='text'
									id='service-area-list'
									placeholder='Add service area list...'
								/>
								<Input
									type='hidden'
									name='service-area-list'
									value={JSON.stringify(serviceArea)}
								/>
								<Button
									type='button'
									variant='secondary'
									size='icon'
									onClick={() => {
										const service_list = document.getElementById(
											'service-area-list',
										) as HTMLInputElement;
										setServiceArea({
											data: [...serviceArea.data!, service_list.value],
										});
										service_list.value = '';
									}}>
									<Cross />
								</Button>
							</div>
							{state.errors?.service_area_list && (
								<p className='text-red-500'>
									{state.errors.service_area_list[0]}
								</p>
							)}
						</div>
						{/* action list */}
						<div className='flex items-center justify-center'>
							<Button type='submit'>Create</Button>
							<Button
								onClick={() => {
									setOpen(false);
								}}
								type='button'
								className='py-2 px-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'>
								Cancel
							</Button>
						</div>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}
