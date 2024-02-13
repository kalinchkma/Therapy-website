CREATE TABLE `service_area` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`service_area_name` varchar(256) NOT NULL,
	`service_area_list` json NOT NULL,
	CONSTRAINT `service_area_id` PRIMARY KEY(`id`)
);
