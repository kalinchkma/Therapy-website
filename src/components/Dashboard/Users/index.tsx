/** @format */

import { User, UsersType } from '@/lib/definitions';
import { getAllUsers } from '@/methods/users-method';
import UserDataTable from './user-table';
import { UserDataCol } from './columns';
import { notFound } from 'next/navigation';

async function getData(): Promise<UserDataCol[]> {
	const users = await getAllUsers();
	if (users) {
		const userList: UserDataCol[] = [];
		users.map((user) => {
			userList.push({
				id: `${user.id}`,
				avatar: user.avatar!,
				email: user.email,
				name: user.name!,
				user_type: user.user_type!,
				designation: user.designation!,
				description: user.description!,
				education: user.education!,
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
		<div className='container mx-auto py-10 h-full'>
			<UserDataTable data={data} />
		</div>
	);
}
