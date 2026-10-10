CREATE TABLE `invoices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`title` varchar(160) NOT NULL,
	`session` varchar(32) NOT NULL,
	`term` varchar(32) NOT NULL,
	`amountKobo` int NOT NULL,
	`dueDate` timestamp,
	`status` enum('unpaid','partially_paid','paid') NOT NULL DEFAULT 'unpaid',
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `invoices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `payments` ADD `invoiceId` int;