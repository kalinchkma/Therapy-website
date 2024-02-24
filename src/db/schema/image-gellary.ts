/** @format */

import { bigint, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const image_gellary = mysqlTable('image_gellary', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	image_path: varchar('image_path', { length: 256 }).notNull(),
	image_url: varchar('image_url', { length: 256 }).notNull(),
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt'),
});
