/** @format */
'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

export default function BlogSearch() {
	const searchParams = useSearchParams();
	const pathname = '/blog';
	const { replace } = useRouter();

	const handleChange2 = useDebouncedCallback((s: string) => {
		const params = new URLSearchParams(searchParams);
		if (s) {
			params.set('key', s);
		} else {
			params.delete('key');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className='flex flex-row mb-8 relative'>
			<input
				type='text'
				placeholder='Search.....'
				defaultValue={searchParams.get('key')?.toString()}
				onChange={(e) => handleChange2(e.target.value)}
				className='w-full py-2 px-4 outline-none border focus:border-blue-700 transition-all'
			/>
			<div className='absolute right-0 top-0 px-4 h-full w-auto flex items-center justify-center'>
				<Search />
			</div>
		</div>
	);
}
