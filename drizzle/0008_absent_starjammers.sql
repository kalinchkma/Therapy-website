ALTER TABLE `services` MODIFY COLUMN `name` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `services` ADD `price` varchar(256) DEFAULT 'None';