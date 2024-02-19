/** @format */

import {
	bigint,
	int,
	json,
	mysqlTable,
	text,
	varchar,
} from 'drizzle-orm/mysql-core';

export const product = mysqlTable('product', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	image: varchar('image', { length: 256 }).notNull(),
	price: bigint('price', { mode: 'number' }).notNull(),
	description: text('description').default('None'),
});
