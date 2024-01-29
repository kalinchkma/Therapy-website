/** @format */

import { User, UsersType } from '@/lib/definitions';
import { getAllUsersExceptAdmin } from '@/methods/users';

async function getData(): Promise<User[]> {
	const users = await getAllUsersExceptAdmin();
	if (users) {
		return users;
	}
	return [];
}

export default async function UsersPageComponent() {
	const data = await getData();
	console.log(data);
	return <div className='container mx-auto py-10'></div>;
}
