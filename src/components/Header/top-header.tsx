/** @format */

import Link from 'next/link';
import React from 'react';
import { SocialLinks } from '@/lib/static_data';
import { FaSquareFacebook } from 'react-icons/fa6';

import Image from 'next/image';

export default function TopHeader() {
	return (
		<nav className='w-full flex justify-between pt-2'>
			<div className='flex'></div>
			<div className='flex'>
				<ul className='flex'>
					<li>
						<Link href={''} className='inline-flex text-blue-800'>
							<FaSquareFacebook />
						</Link>
					</li>
					<li>
						<Link href={''}>
							<FaSquareFacebook />
						</Link>
					</li>
					<li>
						<Link href={''}>
							<FaSquareFacebook />
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
