/** @format */

import {
	mysqlTable,
	bigint,
	varchar,
	text,
	json,
} from 'drizzle-orm/mysql-core';

export const services = mysqlTable('services', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	name: varchar('name', { length: 256 }).notNull(),
	thumbnailImage: varchar('thumbnailImage', { length: 256 }).notNull(),
	description: text('description').default('None'),
	content: json('content').default({}),
	price: varchar('name', { length: 256 }).default('None'),
});
