/** @format */

import { cn } from '@/lib/utils';
import React from 'react';

interface ServiceAreaCardProps {
	className?: string;
	title: string;
	areas: string[];
}

export default function ServiceAreaCard({
	className,
	title,
	areas,
}: ServiceAreaCardProps) {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center py-8 border cursor-pointer hover:scale-105 transition-all duration-300',
				className,
			)}>
			<h4 className='font-bold text-xl mb-4 text-zinc-600'>{title}</h4>
			<ul className='flex flex-col'>
				{areas.map((area, index) => (
					<li key={index}>
						<p className='text-zinc-600'>{area}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
