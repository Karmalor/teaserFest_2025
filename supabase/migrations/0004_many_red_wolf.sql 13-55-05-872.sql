ALTER TABLE "form_submissions" ADD COLUMN "applicantResponse" text;--> statement-breakpoint
ALTER TABLE "form_submissions" DROP COLUMN IF EXISTS "uuid";