ALTER TABLE `resultTemplateLayouts` ADD `fontFamily` varchar(64) DEFAULT 'system' NOT NULL;--> statement-breakpoint
ALTER TABLE `resultTemplateLayouts` ADD `customHeader` varchar(300) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `resultTemplateLayouts` ADD `customFooter` varchar(300) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `resultTemplateLayouts` ADD `watermarkUrl` varchar(500);--> statement-breakpoint
ALTER TABLE `resultTemplateLayouts` ADD `watermarkKey` varchar(255);--> statement-breakpoint
ALTER TABLE `resultTemplateLayouts` ADD `watermarkOpacity` int DEFAULT 12 NOT NULL;--> statement-breakpoint
ALTER TABLE `resultTemplateLayouts` ADD `watermarkSize` int DEFAULT 60 NOT NULL;