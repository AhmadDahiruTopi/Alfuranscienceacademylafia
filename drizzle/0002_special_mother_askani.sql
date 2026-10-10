CREATE TABLE `staff` (
	`id` int AUTO_INCREMENT NOT NULL,
	`staffNo` varchar(32) NOT NULL,
	`name` varchar(160) NOT NULL,
	`staffRole` varchar(80) NOT NULL,
	`department` varchar(100) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`email` varchar(320) NOT NULL,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `staff_id` PRIMARY KEY(`id`),
	CONSTRAINT `staff_staffNo_unique` UNIQUE(`staffNo`)
);
--> statement-breakpoint
ALTER TABLE `students` ADD `studentPhone` varchar(32);--> statement-breakpoint
ALTER TABLE `students` ADD `parentPhone` varchar(32) NOT NULL;