ALTER TABLE `users` ADD `member_type` varchar(256) DEFAULT 'client';--> statement-breakpoint
ALTER TABLE `users` ADD `designation` varchar(256) DEFAULT 'None';--> statement-breakpoint
ALTER TABLE `users` ADD `education` text DEFAULT ('None');--> statement-breakpoint
ALTER TABLE `users` ADD `description` text DEFAULT ('None');--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` varchar(256) DEFAULT 'None';