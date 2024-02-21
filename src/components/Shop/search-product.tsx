/** @format */
'use client';
import React from 'react';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchProduct() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleChange = useDebouncedCallback((s: string) => {
		const params = new URLSearchParams(searchParams);
		if (s) {
			params.set('search', s);
		} else {
			params.delete('search');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className='flex flex-row relative w-full md:w-auto'>
			<input
				type='text'
				placeholder='Search'
				className='rounded-full outline-none pl-5 pr-12 py-3 border-2 text-zinc-500 flex-grow focus:border-blue-300 transition-all w-full'
				onChange={(e) => {
					handleChange(e.target.value);
				}}
			/>
			<button className='inline-block font-bold text-zinc-800 hover:text-blue-400 text-lg absolute right-0 top-0 h-full px-4'>
				<IconCreator icon={IconType.Search} />
			</button>
		</div>
	);
}
