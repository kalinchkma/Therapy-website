/** @format */

import {
	bigint,
	json,
	mysqlTable,
	text,
	varchar,
} from 'drizzle-orm/mysql-core';

export const informations = mysqlTable('informations', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	openning_hours: json('openning_hours').notNull(),
	emails: text('emails').notNull(),
	location: text('location').notNull(),
	contact_numbers: text('contact_numbers').notNull(),
	social_links: json('social_links').notNull(),
	logo: varchar('logo', { length: 256 }).notNull(),
	website_name: varchar('website_name', { length: 256 }).notNull(),
	product_shipping_charge: json('product_shipping_charge').default('None'),
});
