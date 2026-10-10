CREATE TABLE `jambMonitoringEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`attemptId` int NOT NULL,
	`studentId` int NOT NULL,
	`eventType` varchar(40) NOT NULL,
	`details` text,
	`warningNumber` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `jambMonitoringEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jambRecordings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`attemptId` int NOT NULL,
	`studentId` int NOT NULL,
	`mediaType` enum('video','audio') NOT NULL,
	`storageKey` varchar(255) NOT NULL,
	`storageUrl` varchar(500) NOT NULL,
	`mimeType` varchar(80) NOT NULL,
	`sizeBytes` int NOT NULL,
	`startedAt` timestamp NOT NULL,
	`endedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `jambRecordings_id` PRIMARY KEY(`id`)
);
