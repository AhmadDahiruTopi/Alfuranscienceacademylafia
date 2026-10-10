CREATE TABLE `jambAnswers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`attemptId` int NOT NULL,
	`questionId` int NOT NULL,
	`selectedOption` varchar(1),
	`isCorrect` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `jambAnswers_id` PRIMARY KEY(`id`),
	CONSTRAINT `jambAnswers_attemptId_questionId_unique` UNIQUE(`attemptId`,`questionId`)
);
--> statement-breakpoint
CREATE TABLE `jambAttempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`examId` int NOT NULL,
	`studentId` int NOT NULL,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`submittedAt` timestamp,
	`score` int NOT NULL DEFAULT 0,
	`correctCount` int NOT NULL DEFAULT 0,
	`percentage` int NOT NULL DEFAULT 0,
	`status` enum('in_progress','submitted','expired') NOT NULL DEFAULT 'in_progress',
	CONSTRAINT `jambAttempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jambExams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subjectId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`durationMinutes` int NOT NULL,
	`questionCount` int NOT NULL,
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jambExams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jambQuestions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`examId` int NOT NULL,
	`questionNumber` int NOT NULL,
	`prompt` text NOT NULL,
	`optionsJson` text NOT NULL,
	`correctOption` varchar(1) NOT NULL,
	`explanation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `jambQuestions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jambSubjects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`status` enum('active','archived') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jambSubjects_id` PRIMARY KEY(`id`),
	CONSTRAINT `jambSubjects_name_unique` UNIQUE(`name`)
);
