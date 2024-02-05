/** @format */

import {
	bigint,
	date,
	json,
	mysqlTable,
	text,
	time,
	varchar,
} from 'drizzle-orm/mysql-core';

export const appointments = mysqlTable('informations', {
	id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
	openning_hours: json('openning_hours').notNull(),
	emails: text('emails').notNull(),
	location: text('location').notNull(),
	contact_numbers: text('contact_numbers').notNull(),
	social_links: json('social_links').notNull(),
});
