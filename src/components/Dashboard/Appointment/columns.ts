/** @format */

export type Appointment = {
	id: number;
	patient_name: string;
	contact_number: string;
	contact_email: string;
	appointment_date: string;
	appointment_time: string;
	message: string;
	selected_service: string;
	user_name?: string;
};
