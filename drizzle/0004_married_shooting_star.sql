CREATE TABLE `services` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`thumbnailImage` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`content` json DEFAULT ('{}'),
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `avatar` varchar(256) DEFAULT '/images/default.jpg';