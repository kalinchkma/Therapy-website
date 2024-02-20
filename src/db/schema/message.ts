/** @format */

import {
	bigint,
	int,
	json,
	mysqlTable,
	text,
	varchar,
} from 'drizzle-orm/mysql-core';

export const messages = mysqlTable('messages', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	name: varchar('name', { length: 256 }).notNull(),
	subject: text('subject').notNull(),
	message: text('message').notNull(),
	phone: varchar('phone', { length: 256 }).default('None'),
	email: varchar('email', { length: 256 }).default('None'),
});
