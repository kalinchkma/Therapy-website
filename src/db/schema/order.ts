/** @format */

import {
	bigint,
	int,
	json,
	mysqlTable,
	text,
	varchar,
} from 'drizzle-orm/mysql-core';

export const order = mysqlTable('order', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	name: varchar('name', { length: 256 }).notNull(),
	total_price: bigint('total_price', { mode: 'number' }).notNull(),
	total_items: bigint('total_items', { mode: 'number' }).notNull(),
	items_list: json('items_list').notNull(),
	phone_number: varchar('phone_number', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).default('None'),
	address: text('address').notNull(),
	region: varchar('region', { length: 256 }).notNull(),
});
