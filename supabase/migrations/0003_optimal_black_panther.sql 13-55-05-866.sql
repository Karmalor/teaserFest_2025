ALTER TABLE "form_submissions" RENAME COLUMN "id" TO "uuid";--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "uuid" SET DATA TYPE uuid;