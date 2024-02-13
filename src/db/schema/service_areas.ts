/** @format */

import { bigint, json, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const service_area = mysqlTable('service_area', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	service_area_name: varchar('service_area_name', { length: 256 }).notNull(),
	service_area_list: json('service_area_list').notNull(),
});
