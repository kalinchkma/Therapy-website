CREATE TABLE `blog` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`thumbnailImage` varchar(256) DEFAULT 'None',
	`summary` text NOT NULL,
	`content` text DEFAULT ('None'),
	`author` varchar(256) NOT NULL,
	`comment` bigint DEFAULT 0,
	`keywords` json DEFAULT (''),
	`createdAt` timestamp,
	`updatedAt` timestamp,
	CONSTRAINT `blog_id` PRIMARY KEY(`id`)
);
