ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_applicant_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "stageName" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_applicant_users_table_email_fk" FOREIGN KEY ("applicant") REFERENCES "public"."users_table"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
