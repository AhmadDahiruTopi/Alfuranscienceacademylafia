ALTER TABLE `classSubjects` ADD `teacherId` int;--> statement-breakpoint
ALTER TABLE `classSubjects` ADD `subjectType` enum('compulsory','elective') DEFAULT 'compulsory' NOT NULL;--> statement-breakpoint
ALTER TABLE `classSubjects` ADD `displayOrder` int DEFAULT 0 NOT NULL;