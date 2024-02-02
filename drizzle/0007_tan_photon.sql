ALTER TABLE `services` MODIFY COLUMN `content` text DEFAULT ('None');--> statement-breakpoint
ALTER TABLE `services` ADD `published` boolean DEFAULT false;