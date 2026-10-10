CREATE TABLE `academyClasses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`section` varchar(32) NOT NULL,
	`capacity` int NOT NULL DEFAULT 40,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `academyClasses_id` PRIMARY KEY(`id`),
	CONSTRAINT `academyClasses_name_unique` UNIQUE(`name`)
);
