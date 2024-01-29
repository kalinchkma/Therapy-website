/** @format */

import { User, UsersType } from '@/lib/definitions';
import { getAllUsersExceptAdmin } from '@/methods/users';
import UserDataTable from './user-table';
import { UserDataCol } from './columns';
import { notFound } from 'next/navigation';

async function getData(): Promise<UserDataCol[]> {
	const users = await getAllUsersExceptAdmin();
	if (users) {
		const userList: UserDataCol[] = [];
		users.map((user) => {
			userList.push({
				id: `${user.id}`,
				email: user.email,
				name: user.name!,
				user_type: user.user_type!,
			});
		});
		return userList;
	}
	return [];
}

export default async function UsersPageComponent() {
	const data = await getData();
	if (!data) {
		notFound();
	}
	return (
		<div className='container mx-auto py-10'>
			<UserDataTable data={data} />
		</div>
	);
}
