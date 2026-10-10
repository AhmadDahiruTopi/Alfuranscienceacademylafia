CREATE TABLE `academicSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(32) NOT NULL,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `academicSessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `academicSessions_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `academicTerms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(32) NOT NULL,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `academicTerms_id` PRIMARY KEY(`id`),
	CONSTRAINT `academicTerms_name_unique` UNIQUE(`name`)
);
