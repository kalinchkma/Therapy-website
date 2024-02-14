/** @format */

import { UsersType } from '@/lib/definitions';

export type Appointment = {
	id: number;
	patient_name: string;
	contact_number: string;
	contact_email: string;
	appointment_date: string;
	appointment_time: string;
	message: string;
	selected_service: number;
	user_id: number;
	appointment_type: string;
	services: {
		id: number;
		name: string;
		content: string | null;
		description: string | null;
		price: string | null;
		thumbnailImage: string;
		published: number | null;
	}[];
	users: {
		id: number;
		name: string;
		email: string;
		password: string;
		user_type: UsersType | null;
		designation: string | null;
		education: string | null;
		description: string | null;
		avatar: string | null;
		createdAt: Date | null;
		updatedAt: Date | null;
	}[];
	all_packages: {
		description: string;
		moneyType: string | null;
		packageDetails: string;
		price: number;
		title: string;
		offers: number | null;
		id: number;
		package_type: string;
	}[];
};
