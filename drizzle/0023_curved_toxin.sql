CREATE TABLE `subjectAccounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subjectId` int NOT NULL,
	`userId` int NOT NULL,
	`username` varchar(80) NOT NULL,
	`initialPassword` varchar(128) NOT NULL,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subjectAccounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `subjectAccounts_subjectId_unique` UNIQUE(`subjectId`),
	CONSTRAINT `subjectAccounts_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `subjectAccounts_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `linkedSubjectId` int;