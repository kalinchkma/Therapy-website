ALTER TABLE `informations` ADD `product_shipping_charge` bigint DEFAULT 0;--> statement-breakpoint
ALTER TABLE `order` ADD `address` text NOT NULL;