/** @format */

import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/logo-2.jpeg';
// import Logo2 from '@/assets/logo.jpg';
import Link from 'next/link';

export default function AppLogo({
	logo,
	name,
}: {
	logo: string;
	name: string;
}) {
	return (
		<Link href={'/'} className='flex gap-3 items-center justify-start'>
			<Image src={logo} alt='logo' width={50} height={50} />
			<h1 className='text-left'>
				<span className='font-bold text-lg text-stone-700'>{name}</span>
				<br />
				{/* <span className='text-sm font-bold text-stone-400'>& Rehab Center</span> */}
			</h1>
		</Link>
	);
}
