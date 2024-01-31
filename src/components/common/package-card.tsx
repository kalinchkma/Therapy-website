/** @format */

import React from 'react';
import ActionButton from './action-button';
import { cn } from '@/lib/utils';

import {
	MoneyType,
	PackageDescriptionType,
	PackageType,
} from '@/lib/definitions';

interface PackageCardProps extends PackageDescriptionType {
	className?: string;
}

export default function PackageCard({
	className,
	description,
	moneyType,
	packageDetails,
	packageLink,
	price,
	title,
	packageType,
	offers,
}: PackageCardProps) {
	let currentPrice: Number = price;
	if (offers) {
		currentPrice = price - price * (Number(offers) / 100);
	}

	return (
		<div
			className={cn(
				'col-span-1 border px-10 py-8 hover:scale-105 transition-all duration-300 ease-in-out',
				className,
			)}>
			<div className='flex flex-col'>
				<h4 className='text-2xl font-bold text-blue-950 text-center pb-3'>
					{title}
				</h4>
				<p className='text-sm text-blue-950 text-center'>{description}</p>
				{/* fee section */}
				<div className='flex flex-col pt-8  pb-10 items-center border-b-2'>
					{offers && (
						<div className='flex flex-row items-center justify-center gap-2'>
							<span className='text-zinc-600 line-through'>
								{moneyType === MoneyType.DOLLER ? `$${price}` : `৳${price}`}
							</span>
							<span className='px-4 py-2 bg-blue-200 text-blue-950 font-bold rounded-full'>
								SAVE {offers}%
							</span>
						</div>
					)}
					<h5 className='py-3 text-blue-950 font-extrabold'>
						<span>{moneyType === MoneyType.DOLLER ? '$' : '৳'}</span>
						<span className='text-4xl'>{String(currentPrice)}</span>
						<span>/{packageType.toString().toLowerCase()}</span>
					</h5>
					<p className='font-bold text-base mb-4 text-blue-950'>
						1 {packageType}
					</p>
					{/* duration */}
					<ActionButton link={packageLink} title='Make Appointment' />
				</div>
				{/* Description box */}
				<div className='flex flex-col items-start justify-center'>
					<h5 className='text-blue-950 font-bold py-8 text-xl capitalize'>
						{packageDetails.title}
					</h5>
					<ul className='text-blue-900 font- text-sm list-disc inline-flex flex-col px-5'>
						{packageDetails.description.map((details, index) => (
							<li key={index}>
								<p>{details}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
