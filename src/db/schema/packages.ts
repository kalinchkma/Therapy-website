/** @format */

import { MoneyType } from '@/lib/definitions';
import {
	bigint,
	int,
	json,
	mysqlTable,
	text,
	varchar,
} from 'drizzle-orm/mysql-core';

export const packages = mysqlTable('packages', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	title: varchar('title', { length: 256 }).notNull(),
	package_type: varchar('package_type', { length: 256 }).notNull(),
	price: int('price').notNull(),
	offers: int('offers').default(0),
	moneyType: varchar('money_type', { length: 256 }).default(MoneyType.TAKA),
	description: text('description').notNull(),
	packageDetails: json('package_details').notNull(),
});
