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

export const blog = mysqlTable('blog', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	title: varchar('title', { length: 256 }).notNull(),
	thumbnailImage: varchar('thumbnailImage', { length: 256 }).default('None'),
	summary: text('summary').notNull(),
	content: text('content').default('None'),
	author: varchar('author', { length: 256 }).notNull(),
	comment: bigint('comment', { mode: 'number' }).default(0),
	keywords: json('keywords').default(''),
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt'),
});
