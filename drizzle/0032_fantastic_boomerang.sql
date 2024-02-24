CREATE TABLE `image_gellary` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`image_path` varchar(256) NOT NULL,
	`image_url` varchar(256) NOT NULL,
	`createdAt` timestamp,
	`updatedAt` timestamp,
	CONSTRAINT `image_gellary_id` PRIMARY KEY(`id`)
);
