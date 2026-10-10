CREATE TABLE `termlyReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`session` varchar(32) NOT NULL,
	`term` varchar(32) NOT NULL,
	`className` varchar(64) NOT NULL,
	`teacherComment` text,
	`coordinatorComment` text,
	`timesPresent` int NOT NULL DEFAULT 0,
	`timesAbsent` int NOT NULL DEFAULT 0,
	`timesLate` int NOT NULL DEFAULT 0,
	`timesExcused` int NOT NULL DEFAULT 0,
	`classPosition` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `termlyReports_id` PRIMARY KEY(`id`)
);
