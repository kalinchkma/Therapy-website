ALTER TABLE `appointment` MODIFY COLUMN `id` bigint AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `appointment` ADD `selected_service` bigint NOT NULL;--> statement-breakpoint
ALTER TABLE `appointment` ADD `user_id` bigint DEFAULT -1;