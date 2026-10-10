CREATE TABLE `classSubjects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`classId` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`code` varchar(24),
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `classSubjects_id` PRIMARY KEY(`id`)
);
