/** @format */

import { config, createDBConnection } from '@/db';
import { packages } from '@/db/schema/packages';
import { page } from '@/db/schema/page';
import { and, eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { redirect } from 'next/navigation';

// get banner
export async function getPageBanner(pageName: string) {
	try {
		// connect db
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		const banner = await db
			.select()
			.from(page)
			.where(and(eq(page.page, pageName), eq(page.section, 'banner')));
		// close db
		conn.end();
		return banner;
	} catch (error) {
		return [];
	}
}

export async function getAbout() {
	try {
		// connect db
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		const banner = await db
			.select()
			.from(page)
			.where(and(eq(page.page, 'about'), eq(page.section, 'about')));
		// close db
		conn.end();
		return banner;
	} catch (error) {
		return [];
	}
}
