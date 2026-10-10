CREATE TABLE `subjectAccountClasses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subjectAccountId` int NOT NULL,
	`classId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `subjectAccountClasses_id` PRIMARY KEY(`id`),
	CONSTRAINT `subjectAccountClasses_subjectAccountId_classId_unique` UNIQUE(`subjectAccountId`,`classId`)
);
