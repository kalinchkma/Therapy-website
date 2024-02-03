ALTER TABLE `services` MODIFY COLUMN `published` int;--> statement-breakpoint
ALTER TABLE `services` MODIFY COLUMN `published` int DEFAULT 0;