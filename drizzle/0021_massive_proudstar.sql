CREATE TABLE `schoolSignatures` (
	`id` int AUTO_INCREMENT NOT NULL,
	`role` enum('principal','teacher') NOT NULL,
	`fileUrl` text NOT NULL,
	`fileKey` text NOT NULL,
	`fileName` varchar(160) NOT NULL,
	`uploadedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `schoolSignatures_id` PRIMARY KEY(`id`)
);
