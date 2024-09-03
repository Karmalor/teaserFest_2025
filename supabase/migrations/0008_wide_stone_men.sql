CREATE TABLE IF NOT EXISTS "form_submissions" (
	"uuid" uuid PRIMARY KEY NOT NULL,
	"applicant" text,
	"stageName" text,
	"tagline" text,
	"photo" text,
	"applicantResponse" jsonb NOT NULL,
	"applicationSubmitted" boolean DEFAULT false
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_applicant_users_table_id_fk" FOREIGN KEY ("applicant") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
