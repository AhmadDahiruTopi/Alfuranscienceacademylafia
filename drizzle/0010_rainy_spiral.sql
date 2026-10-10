CREATE TABLE `assignmentSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`assignmentId` int NOT NULL,
	`studentId` int NOT NULL,
	`submissionText` text,
	`submissionUrl` text,
	`submissionKey` text,
	`score` int,
	`feedback` text,
	`status` enum('submitted','graded') NOT NULL DEFAULT 'submitted',
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	`gradedAt` timestamp,
	CONSTRAINT `assignmentSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `assignments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`className` varchar(64) NOT NULL,
	`subject` varchar(100) NOT NULL,
	`instructions` text NOT NULL,
	`dueDate` timestamp NOT NULL,
	`totalMarks` int NOT NULL DEFAULT 100,
	`attachmentUrl` text,
	`attachmentKey` text,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `assignments_id` PRIMARY KEY(`id`)
);
