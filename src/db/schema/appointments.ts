/** @format */

import {
	bigint,
	date,
	mysqlTable,
	text,
	time,
	varchar,
} from 'drizzle-orm/mysql-core';

export const appointments = mysqlTable('appointment', {
	id: bigint('id', { mode: 'bigint' }).primaryKey().autoincrement(),
	patient_name: varchar('patient_name', { length: 256 }).notNull(),
	contact_number: varchar('contact_number', { length: 256 }).notNull(),
	contact_email: varchar('contact_email', { length: 256 }).default('None'),
	selected_service: bigint('selected_service', { mode: 'number' }).notNull(),
	appointment_date: text('appointment_date').notNull(),
	appointment_time: text('appointment_time').notNull(),
	message: text('message').default('None'),
	user_id: bigint('user_id', { mode: 'number' }).default(-1),
});
