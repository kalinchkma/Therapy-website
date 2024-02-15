/** @format */

'use client';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBlog() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleChange = useDebouncedCallback((s: string) => {
		const params = new URLSearchParams(searchParams);
		if (s) {
			params.set('blog', s);
		} else {
			params.delete('blog');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div>
			<Input
				type='text'
				placeholder='Search...'
				onChange={(e) => {
					handleChange(e.target.value);
				}}
				defaultValue={searchParams.get('blog')?.toString()}
			/>
		</div>
	);
}
