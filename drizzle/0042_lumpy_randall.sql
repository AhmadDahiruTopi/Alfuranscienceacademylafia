CREATE TABLE `studentEnrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`session` varchar(32) NOT NULL,
	`className` varchar(64) NOT NULL,
	`source` enum('import','promotion','manual') NOT NULL DEFAULT 'manual',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `studentEnrollments_id` PRIMARY KEY(`id`),
	CONSTRAINT `studentEnrollments_student_session_unique` UNIQUE(`studentId`,`session`)
);
--> statement-breakpoint
ALTER TABLE `studentPromotions` ADD `fromSession` varchar(32);--> statement-breakpoint
ALTER TABLE `studentPromotions` ADD `toSession` varchar(32);