CREATE TABLE `appointment` (
	`id` bigint DEFAULT -1,
	`patient_name` varchar(256) NOT NULL,
	`contact_number` varchar(256) NOT NULL,
	`contact_email` varchar(256) DEFAULT 'None',
	`appointment_date` date NOT NULL,
	`appointment_time` time NOT NULL,
	`message` text DEFAULT ('None'),
	CONSTRAINT `appointment_id` PRIMARY KEY(`id`)
);
