CREATE TABLE `photoAuditLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`targetType` enum('student','staff') NOT NULL,
	`targetId` int NOT NULL,
	`action` enum('replace','remove') NOT NULL,
	`previousImageUrl` text,
	`newImageUrl` text,
	`changedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `photoAuditLogs_id` PRIMARY KEY(`id`)
);
