CREATE TABLE `jambLiveSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`attemptId` int NOT NULL,
	`studentId` int NOT NULL,
	`examId` int NOT NULL,
	`status` enum('waiting','live','ended') NOT NULL DEFAULT 'waiting',
	`offerJson` text,
	`answerJson` text,
	`lastHeartbeat` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jambLiveSessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `jambLiveSessions_attemptId_unique` UNIQUE(`attemptId`)
);
--> statement-breakpoint
CREATE TABLE `schoolSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`schoolName` varchar(180) NOT NULL DEFAULT 'Alfurqan Science Academy Lafia',
	`schoolAddress` text NOT NULL DEFAULT ('Behind GSS Lafia East Secondary School, Lafia.'),
	`schoolPhone` varchar(80) NOT NULL DEFAULT '',
	`receiptHeader` varchar(180) NOT NULL DEFAULT 'Official verified payment receipt',
	`receiptFooter` text NOT NULL DEFAULT ('Keep this receipt for your records.'),
	`receiptPrefix` varchar(32) NOT NULL DEFAULT 'AFSAL-RCPT',
	`updatedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `schoolSettings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `payments` ADD `receiptNumber` varchar(64);--> statement-breakpoint
ALTER TABLE `payments` ADD `receiptIssuedAt` timestamp;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_receiptNumber_unique` UNIQUE(`receiptNumber`);