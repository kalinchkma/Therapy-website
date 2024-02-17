CREATE TABLE `customer_review` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`video_url` varchar(256) NOT NULL,
	`thumbnail_image` varchar(256) NOT NULL,
	`createdAt` timestamp,
	`updatedAt` timestamp,
	CONSTRAINT `customer_review_id` PRIMARY KEY(`id`)
);
