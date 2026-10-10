CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`reference` varchar(80) NOT NULL,
	`method` enum('bank_transfer','paystack') NOT NULL,
	`amountKobo` int NOT NULL,
	`proofDetails` text,
	`status` enum('pending','verified','rejected') NOT NULL DEFAULT 'pending',
	`verifiedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`),
	CONSTRAINT `payments_reference_unique` UNIQUE(`reference`)
);
--> statement-breakpoint
CREATE TABLE `resultEntries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`session` varchar(32) NOT NULL,
	`term` varchar(32) NOT NULL,
	`className` varchar(64) NOT NULL,
	`subject` varchar(100) NOT NULL,
	`caScore` int NOT NULL DEFAULT 0,
	`examScore` int NOT NULL DEFAULT 0,
	`status` enum('draft','submitted','approved','locked','published') NOT NULL DEFAULT 'draft',
	`submittedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resultEntries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` int AUTO_INCREMENT NOT NULL,
	`admissionNo` varchar(32) NOT NULL,
	`name` varchar(160) NOT NULL,
	`className` varchar(64) NOT NULL,
	`status` enum('active','pending','inactive') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `students_id` PRIMARY KEY(`id`),
	CONSTRAINT `students_admissionNo_unique` UNIQUE(`admissionNo`)
);
