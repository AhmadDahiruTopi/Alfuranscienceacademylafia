CREATE TABLE `galleryImages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(160) NOT NULL,
	`caption` text,
	`imageUrl` text NOT NULL,
	`storageKey` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `galleryImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `publicAnnouncements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`summary` text NOT NULL,
	`status` enum('draft','published') NOT NULL DEFAULT 'published',
	`publishedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `publicAnnouncements_id` PRIMARY KEY(`id`)
);
