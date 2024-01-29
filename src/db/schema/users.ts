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
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt'),
});
