CREATE TABLE `packages` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`package_type` varchar(256) NOT NULL,
	`price` int NOT NULL,
	`offers` int DEFAULT 0,
	`money_type` varchar(256) DEFAULT 'taka',
	`description` text NOT NULL,
	`package_details` json NOT NULL,
	CONSTRAINT `packages_id` PRIMARY KEY(`id`)
);
