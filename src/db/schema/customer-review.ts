/** @format */

import { bigint, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const customer_review = mysqlTable('customer_review', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	video_url: varchar('video_url', { length: 256 }).notNull(),
	thumbnail_image: varchar('thumbnail_image', { length: 256 }).notNull(),
	createdAt: timestamp('createdAt'),
	updatedAt: timestamp('updatedAt'),
});
