/** @format */

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui/button';

interface ServiceAreaCardProps {
	className?: string;
	title: string;
	areas: string[];
	scope?: string;
	id?: number;
	admin?: React.ReactNode;
}

export default function ServiceAreaCard({
	className,
	title,
	areas,
	admin,
}: ServiceAreaCardProps) {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center py-8 border cursor-pointer hover:scale-105 transition-all duration-300',
				className,
			)}>
			<h4 className='font-bold text-xl mb-4 text-zinc-600'>{title}</h4>
			<ul className='flex flex-col items-center'>
				{areas.map((area, index) => (
					<li key={index}>
						<p className='text-zinc-600'>{area}</p>
					</li>
				))}
			</ul>
			{/* for admin */}
			{admin}
		</div>
	);
}
