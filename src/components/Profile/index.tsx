/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import { User, UsersType } from '@/lib/definitions';
import ContentWrapper from '../common/content-wrapper';
import Image from 'next/image';
import UpdateImage from './update-image';
import { checkAndGetAuth } from '@/lib/helper_function';
import { notFound, redirect } from 'next/navigation';

export default async function ProfilePageCompnent() {
	const auth = await checkAndGetAuth();

	if (auth === '/404' || auth === '/login') {
		notFound();
	}

	return (
		<div className='w-full'>
			<PageTitle name={auth?.name} />
			<ContentWrapper className='py-8'>
				{/* Only for client user */}
				<div className='w-full grid grid-cols-4 my-10'>Only client</div>
				{/* Only for admin or team member user */}
				{(auth?.user_type === UsersType.admin ||
					auth?.user_type === UsersType['team-member'] ||
					auth.user_type === UsersType['team-onboard']) && (
					<div className='w-full grid grid-cols-4 my-10'>
						<div className='col-span-1 relative'>
							<Image
								src={auth?.avatar ? auth.avatar : '/images/default.jpg'}
								width={'250'}
								height={'250'}
								alt='profile image'
								className='min-w-[100%] object-cover'
							/>
							<div className='absolute top-0 left-0 h-full w-full bg-zinc-200 bg-opacity-20 flex items-end justify-center'>
								<UpdateImage authId={auth.id as string} path='/profile' />
							</div>
						</div>
						<div className='col-span-3'></div>
					</div>
				)}
			</ContentWrapper>
		</div>
	);
}
