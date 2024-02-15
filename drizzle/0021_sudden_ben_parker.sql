CREATE TABLE `comments` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`comment_content` text NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`blog_id` bigint NOT NULL,
	`createdAt` timestamp,
	`updatedAt` timestamp,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
