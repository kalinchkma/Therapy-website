/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import { User, UsersType } from '@/lib/definitions';
import ContentWrapper from '../common/content-wrapper';

export default function ProfilePageCompnent({ auth }: { auth?: User }) {
	return (
		<div className='w-full'>
			<PageTitle name={auth?.name} />
			<ContentWrapper className='py-8'>
				{(auth?.user_type === UsersType.admin ||
					auth?.user_type === UsersType['team-member']) && (
					<div className='w-full'>
						{/* <div>{auth.avatar}</div>
						<div>{auth.education}</div>
						<div>{auth.description}</div> */}
						admin {auth.avatar} {auth.name}
					</div>
				)}
				<div className='w-full'>Only Client</div>
			</ContentWrapper>
		</div>
	);
}
