/** @format */

import {
	mysqlTable,
	bigint,
	varchar,
	timestamp,
	text,
} from 'drizzle-orm/mysql-core';

import { UsersType } from '@/lib/definitions';

export const users = mysqlTable('users', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	name: varchar('name', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).notNull().unique(),
	password: text('password').notNull(),
	user_type: varchar('user_type', { length: 256 })
		.$type<UsersType>()
		.default(UsersType.client),
	designation: varchar('designation', { length: 256 }).default('Client'),
	education: text('education').default('None'),
	description: text('description').default('None'),
	avatar: varchar('avatar', { length: 256 }).default('/images/default.jpg'),
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt'),
});
