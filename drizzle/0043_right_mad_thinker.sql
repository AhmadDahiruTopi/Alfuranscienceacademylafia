CREATE TABLE `examCards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`session` varchar(32) NOT NULL,
	`term` varchar(32) NOT NULL,
	`className` varchar(64) NOT NULL,
	`examinationTitle` varchar(180) NOT NULL,
	`examinationDate` timestamp,
	`venue` varchar(160) NOT NULL DEFAULT '',
	`subjectsJson` text NOT NULL,
	`timetableJson` text NOT NULL,
	`status` enum('issued','printed','cancelled') NOT NULL DEFAULT 'issued',
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `examCards_id` PRIMARY KEY(`id`)
);
