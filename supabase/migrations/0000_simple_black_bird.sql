CREATE TABLE IF NOT EXISTS "application_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"applicationSubmitted" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "form_submissions" (
	"user" text,
	"stageName" text NOT NULL,
	"tagline" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullName" text NOT NULL,
	"email" text NOT NULL,
	"imageUrl" text,
	"orders" serial NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
