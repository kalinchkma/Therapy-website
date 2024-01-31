/** @format */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { IconType } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import IconCreator from '../common/icon-creator';
import { DashboardNavigation } from '@/lib/static_data';
import { usePathname } from 'next/navigation';

export default function Sidebar({ logout }: { logout: () => Promise<void> }) {
	const pathname = usePathname();
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

	const sidebarOpenHander = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div
			className={cn(
				'w-full h-[100vh] transition-all border-r border-transparent ',
				sidebarOpen && 'border-zinc-200 bg-zinc-50',
			)}>
			{/* sidebar header */}
			<div
				className={cn(
					'flex justify-between items-center w-full h-[60px] px-4',
					sidebarOpen && 'border-b',
				)}>
				<h1
					className={cn(
						'w-0 overflow-hidden text-2xl font-bold text-blue-900',
						sidebarOpen && 'w-auto overflow-auto',
					)}>
					Dashboard
				</h1>
				<button
					className={cn('inline-flex items-center justify-center')}
					onClick={sidebarOpenHander}>
					<IconCreator
						icon={IconType.Bar}
						className='h-6 w-6 font-thin text-blue-950'
					/>
				</button>
			</div>
			<div
				className={cn(
					'flex flex-col justify-between w-0 p-4 overflow-hidden',
					sidebarOpen && 'w-[250px] transition-all overflow-auto',
				)}>
				<ul
					className={cn(
						'flex flex-col gap-3 flex-grow',
						sidebarOpen ? 'w-auto overflow-auto' : 'w-0 overflow-hidden',
					)}>
					{DashboardNavigation.map((navigation, index) => (
						<li key={index}>
							<Link
								href={navigation.link}
								className={cn(
									'font-light text-lg capitalize text-zinc-600 hover:text-blue-500 transition-all flex items-center gap-2',
									pathname === navigation.link && 'text-blue-500',
								)}>
								<IconCreator icon={navigation.icon} />
								{navigation.title}
							</Link>
						</li>
					))}
					<li>
						<form action={logout}>
							<button
								type='submit'
								className={cn(
									'cursor-pointer text-lg capitalize text-zinc-600 hover:text-blue-500 transition-all flex items-center gap-2',
								)}>
								<IconCreator icon={IconType.Logout} />
								Logout
							</button>
						</form>
					</li>
				</ul>
			</div>
		</div>
	);
}
