/** @format */

import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/logo-2.jpeg';

export default function AppLogo() {
	return (
		<div className='flex gap-3 items-center justify-start'>
			<Image src={Logo} alt='logo' width={50} height={50} />
			<h1 className='text-left'>
				<span className='font-bold text-lg text-stone-700'>
					Universal Physiotherapy
				</span>
				<br />
				<span className='text-sm font-bold text-stone-400'>& Rehab Center</span>
			</h1>
		</div>
	);
}
