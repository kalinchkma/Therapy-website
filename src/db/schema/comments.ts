/** @format */

import {
	bigint,
	date,
	json,
	mysqlTable,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/mysql-core';

export const comments = mysqlTable('comments', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	comment_content: text('comment_content').notNull(),
	name: varchar('name', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).notNull(),
	blog_id: bigint('blog_id', { mode: 'number' }).notNull(),
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt'),
});
