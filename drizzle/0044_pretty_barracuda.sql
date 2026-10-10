ALTER TABLE `examCards` ADD `visibilityStatus` enum('pending','approved','hidden') DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `examCards` ADD `approvedBy` int;--> statement-breakpoint
ALTER TABLE `examCards` ADD `approvedAt` timestamp;--> statement-breakpoint
ALTER TABLE `schoolSettings` ADD `examinationRulesJson` text;