CREATE TABLE `alumni` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`admissionNo` varchar(64) NOT NULL,
	`finalClassName` varchar(64) NOT NULL,
	`graduatedBy` int NOT NULL,
	`graduatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `alumni_id` PRIMARY KEY(`id`),
	CONSTRAINT `alumni_studentId_unique` UNIQUE(`studentId`)
);
--> statement-breakpoint
ALTER TABLE `studentPromotions` ADD `rolledBackBy` int;--> statement-breakpoint
ALTER TABLE `studentPromotions` ADD `rolledBackAt` timestamp;