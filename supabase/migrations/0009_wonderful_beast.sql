CREATE TABLE IF NOT EXISTS "showcase" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"location" text,
	"photo" text,
	"startDateTime" date,
	"endDateTime" date,
	"tickets" text,
	"url" text,
	"createdAt" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ticket_orders" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" text,
	"buyerId" text,
	"createdAt" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "types" (
	"id" uuid PRIMARY KEY NOT NULL,
	"showcase" text,
	"tier" text,
	"price" text,
	"capacity" integer
);
--> statement-breakpoint
ALTER TABLE "application_orders" ADD COLUMN "createdAt" date;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD COLUMN "submittedAt" date;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD COLUMN "createdAt" date;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket_orders" ADD CONSTRAINT "ticket_orders_buyerId_users_table_id_fk" FOREIGN KEY ("buyerId") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "types" ADD CONSTRAINT "types_showcase_showcase_title_fk" FOREIGN KEY ("showcase") REFERENCES "public"."showcase"("title") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "application_orders" DROP COLUMN IF EXISTS "applicationSubmitted";--> statement-breakpoint
ALTER TABLE "form_submissions" DROP COLUMN IF EXISTS "photo";