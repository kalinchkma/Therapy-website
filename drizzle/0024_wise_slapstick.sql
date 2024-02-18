CREATE TABLE `page` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`page` varchar(256) NOT NULL,
	`section` varchar(256) NOT NULL,
	`content` json NOT NULL,
	CONSTRAINT `page_id` PRIMARY KEY(`id`)
);
