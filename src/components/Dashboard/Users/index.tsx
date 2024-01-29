/** @format */

import { User, UsersType } from '@/lib/definitions';
import { getAllUsersExceptAdmin } from '@/methods/users';
import UserDataTable from './user-table';

async function getData(): Promise<User[]> {
	const users = await getAllUsersExceptAdmin();
	if (users) {
		return users;
	}
	return [];
}

export default async function UsersPageComponent() {
	const data = await getData();

	return (
		<div className='container mx-auto py-10'>
			<UserDataTable />
		</div>
	);
}
