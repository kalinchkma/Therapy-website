/** @format */

import {
	mysqlTable,
	bigint,
	varchar,
	text,
	boolean,
	int,
} from 'drizzle-orm/mysql-core';

export const services = mysqlTable('services', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	name: varchar('name', { length: 256 }).notNull(),
	price: varchar('price', { length: 256 }).default('None'),
	thumbnailImage: varchar('thumbnailImage', { length: 256 }).notNull(),
	description: text('description').default('None'),
	content: text('content').default('None'),
	published: int('published').default(0),
});
