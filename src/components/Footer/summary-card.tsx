/** @format */

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import IconCreator from '../common/icon-creator';

interface SummaryCardProps {
	className?: string;
}

export default function SummaryCard({ className }: SummaryCardProps) {
	return (
		<div className={cn('', className)}>
			<h5 className='font-bold text-zinc-400 text-xl mb-5'>Navigation</h5>
			<ul>
				<li>
					<Link
						href='/'
						className='flex flex-row items-center justify-start text-zinc-500 gap-2'>
						{/* <IconCreator icon={} /> */}
						Home
					</Link>
				</li>
			</ul>
		</div>
	);
}
