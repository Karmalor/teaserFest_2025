ALTER TABLE "form_submissions" ALTER COLUMN "applicantResponse" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "applicantResponse" DROP NOT NULL;