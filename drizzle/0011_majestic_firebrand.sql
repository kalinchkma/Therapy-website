CREATE TABLE `informations` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`openning_hours` json NOT NULL,
	`emails` text NOT NULL,
	`location` text NOT NULL,
	`contact_numbers` text NOT NULL,
	`social_links` json NOT NULL,
	`logo` varchar(256) NOT NULL,
	CONSTRAINT `informations_id` PRIMARY KEY(`id`)
);
