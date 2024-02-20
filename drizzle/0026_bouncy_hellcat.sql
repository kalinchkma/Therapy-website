CREATE TABLE `messages` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`phone` varchar(256) DEFAULT 'None',
	`email` varchar(256) DEFAULT 'None',
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
