ALTER TABLE `packages` MODIFY COLUMN `money_type` varchar(256) DEFAULT 'Taka';--> statement-breakpoint
ALTER TABLE `packages` MODIFY COLUMN `package_details` text NOT NULL;