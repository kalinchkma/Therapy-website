/** @format */

import {
	bigint,
	int,
	json,
	mysqlTable,
	text,
	varchar,
} from 'drizzle-orm/mysql-core';

export const page = mysqlTable('page', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	page: varchar('page', { length: 256 }).notNull(),
	section: varchar('section', { length: 256 }).notNull(),
	content: json('content').notNull(),
});
