CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`first_name` varchar(256) NOT NULL,
	`last_name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`phone_number` varchar(256) NOT NULL,
	`user_type` varchar(256) DEFAULT '1287398721',
	`createdAt` timestamp,
	`updatedAt` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
