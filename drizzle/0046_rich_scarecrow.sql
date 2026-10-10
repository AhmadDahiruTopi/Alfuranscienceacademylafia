CREATE TABLE `photoAssets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`targetType` enum('student','staff') NOT NULL,
	`targetId` int NOT NULL,
	`imageUrl` text NOT NULL,
	`imageKey` text NOT NULL,
	`fileName` varchar(180) NOT NULL,
	`contentType` varchar(80) NOT NULL,
	`uploadedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `photoAssets_id` PRIMARY KEY(`id`),
	CONSTRAINT `photoAssets_target_unique` UNIQUE(`targetType`,`targetId`)
);
