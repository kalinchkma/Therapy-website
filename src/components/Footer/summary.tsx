/** @format */

import React from 'react';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';
import Link from 'next/link';
import { NavigationLinks, OpenningHours } from '@/lib/static_data';

export default function Summary({
	informations,
}: {
	informations: {
		id: number;
		openning_hours: unknown;
		emails: string;
		location: string;
		contact_numbers: string;
		social_links: unknown;
		logo: string;
		website_name: string;
		product_shipping_charge: unknown;
	}[];
}) {
	const openning_hours = JSON.parse(String(informations[0].openning_hours)) as {
		Friday: string;
		Saturday: string;
		Sunday: string;
		Monday: string;
		Tuesday: string;
		Wednessday: string;
		Thursday: string;
	};
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-5'>
			<div className='col-span-1'>
				<h5 className='font-bold text-white text-xl mb-5'>About us</h5>
				<p className='text-zinc-100'>
					We are proud to offer a wide range of comprehensive services to meet
					the needs of adults, seniors, and pediatric patients. Our team of
					professional caregivers specialize in providing personalized medical
					care, rehabilitative therapy and companion assistance
				</p>
			</div>
			<div className='col-span-1 lg:ml-16'>
				<h5 className='font-bold text-white text-xl mb-5'>Navigation</h5>
				<ul>
					{NavigationLinks.map((link) => (
						<li key={link.name}>
							<Link
								href={link.path}
								className='flex flex-row items-center justify-start text-zinc-300 gap-2 hover:text-white transition-all'>
								<IconCreator icon={IconType.RightArrow} />
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			{/* services */}
			<div className='col-span-1'>
				<h5 className='font-bold text-white text-xl mb-5'>Services</h5>
				<ul>
					{NavigationLinks.filter(
						(link) => link.name.toLocaleLowerCase() === 'services',
					)[0].nestedLinks?.map((link) => (
						<li key={link.name}>
							<Link
								href={link.path}
								className='flex flex-row items-center justify-start text-zinc-300 gap-2 hover:text-white transition-all'>
								<IconCreator icon={IconType.RightArrow} />
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className='col-span-1'>
				<h5 className='font-bold text-white text-xl mb-5'>Openning Hours</h5>
				<ul className='flex flex-col gap-2'>
					{Object.entries(openning_hours).map(([key, value], index) => (
						<li
							key={index}
							className='flex flex-row lg:justify-between items-center gap-2 text-zinc-300'>
							<span>{key}</span>
							<span>{value}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
