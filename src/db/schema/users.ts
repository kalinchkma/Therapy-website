/** @format */

import {
	mysqlTable,
	bigint,
	varchar,
	timestamp,
	text,
} from 'drizzle-orm/mysql-core';

// user categories
export enum UsersType {
	'admin' = '872137232',
	'super-admin' = '9817238972',
	'client' = '1287398721',
}

export const users = mysqlTable('users', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	first_name: varchar('first_name', { length: 256 }).notNull(),
	last_name: varchar('last_name', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).notNull().unique(),
	password: text('password').notNull(),
	user_type: varchar('user_type', { length: 256 })
		.$type<UsersType>()
		.default(UsersType.client),
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt'),
});
