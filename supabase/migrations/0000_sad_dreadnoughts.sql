CREATE TABLE IF NOT EXISTS "application_orders" (
	"id" text PRIMARY KEY NOT NULL,
	"applicationSubmitted" boolean DEFAULT false,
	"amount" text,
	"buyerId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "form_submissions" (
	"applicant" text,
	"stageName" text,
	"tagline" text,
	"applicationSubmitted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text,
	"firstName" text,
	"lastName" text,
	"imageUrl" text,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_orders" ADD CONSTRAINT "application_orders_buyerId_users_table_id_fk" FOREIGN KEY ("buyerId") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
