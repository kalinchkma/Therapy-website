/** @format */
'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cross, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { FormState, updateServiceArea } from '@/actions/service-area-actions';
import { Textarea } from '@/components/ui/textarea';

export default function UpdateServiceArea({
	ServiceArea,
}: {
	ServiceArea: {
		id: number;
		service_area_name: string;
		service_area_list: unknown;
	};
}) {
	const [open, setOpen] = useState<boolean>(false);

	const initialState: FormState = { status: 100 };

	const update_service_area = updateServiceArea.bind(null, ServiceArea.id);

	const [state, dispatch] = useFormState(update_service_area, initialState);

	return (
		<Dialog open={open}>
			<Button
				onClick={() => {
					setOpen(true);
				}}>
				Edit
			</Button>
			<DialogContent className='max-w-full md:max-w-[600px]'>
				<form
					className='flex flex-col'
					action={dispatch}
					id='service-area-form'>
					<h1 className='text-center font-bold text-lg md:text-2xl border-b py-4'>
						Update service area
					</h1>
					{state.status === 500 && (
						<p className='text-red-400 mb-3 text-center'>{state.message}</p>
					)}
					{state.status === 200 && (
						<p className='text-green-400 text-center'>{state.message}</p>
					)}

					{/* e------------------------ */}
					<div className='flex flex-col gap-2 mb-3 mt-3'>
						<Label htmlFor='service-name' className='text-zinc-700 text-md'>
							Service Area Name
						</Label>
						<Input
							type='text'
							name='service-area-name'
							defaultValue={ServiceArea.service_area_name}
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

						<div className='flex gap-2'>
							<Textarea
								name='service-area-list'
								defaultValue={JSON.stringify(
									JSON.parse(String(ServiceArea.service_area_list)),
									undefined,
									2,
								).trim()}
								className='max-h-[300px] h-[250px]'
							/>
						</div>
						{state.errors?.service_area_list && (
							<p className='text-red-500'>
								{state.errors.service_area_list[0]}
							</p>
						)}
					</div>
					{/* action list */}
					<div className='flex items-center justify-center'>
						<Button type='submit'>Update</Button>
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
			</DialogContent>
		</Dialog>
	);
}
