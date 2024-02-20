CREATE TABLE `order` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`total_price` bigint NOT NULL,
	`total_items` bigint NOT NULL,
	`items_list` json NOT NULL,
	`phone_number` varchar(256) NOT NULL,
	`email` varchar(256) DEFAULT 'None',
	CONSTRAINT `order_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`image` varchar(256) NOT NULL,
	`price` bigint NOT NULL,
	`description` text DEFAULT ('None'),
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
