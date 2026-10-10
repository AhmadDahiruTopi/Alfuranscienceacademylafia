CREATE TABLE `studentPromotions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`fromClassName` varchar(64) NOT NULL,
	`toClassName` varchar(64) NOT NULL,
	`promotedBy` int NOT NULL,
	`promotedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `studentPromotions_id` PRIMARY KEY(`id`)
);
