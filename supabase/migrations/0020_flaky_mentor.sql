CREATE TABLE IF NOT EXISTS "attendees" (
	"email" text NOT NULL,
	"firstName" text,
	"lastName" text,
	CONSTRAINT "attendees_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "weekend_pass_types" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"priceInCents" integer NOT NULL,
	"capacity" integer,
	"description" text,
	"isAvailableForPurchase" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp,
	CONSTRAINT "weekend_pass_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "weekend_passes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"ticketHolder" text,
	"isComp" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "showcase" RENAME TO "showcases";--> statement-breakpoint
ALTER TABLE "ticketTypes" RENAME TO "ticket_types";--> statement-breakpoint
ALTER TABLE "users_table" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "ticket_orders" RENAME COLUMN "buyer" TO "buyerId";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_table_email_unique";--> statement-breakpoint
ALTER TABLE "application_orders" DROP CONSTRAINT "application_orders_buyerId_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_applicant_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "ticket_orders" DROP CONSTRAINT "ticket_orders_buyer_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "ticket_orders" DROP CONSTRAINT "ticket_orders_productId_products_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_ticketHolder_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_orderId_ticket_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "showcases" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "showcases" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "showcases" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "ticket_orders" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "ticket_orders" ALTER COLUMN "createdAt" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "ticket_orders" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "ticket_types" ALTER COLUMN "priceInCents" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "showcases" ADD COLUMN "startDate" date;--> statement-breakpoint
ALTER TABLE "showcases" ADD COLUMN "startTime" time;--> statement-breakpoint
ALTER TABLE "showcases" ADD COLUMN "endTime" time;--> statement-breakpoint
ALTER TABLE "ticket_orders" ADD COLUMN "amount" text;--> statement-breakpoint
ALTER TABLE "ticket_orders" ADD COLUMN "qty" integer;--> statement-breakpoint
ALTER TABLE "ticket_types" ADD COLUMN "showcase" text;--> statement-breakpoint
ALTER TABLE "ticket_types" ADD COLUMN "capacity" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weekend_pass_types" ADD CONSTRAINT "weekend_pass_types_showcase_showcases_id_fk" FOREIGN KEY ("showcase") REFERENCES "public"."showcases"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weekend_passes" ADD CONSTRAINT "weekend_passes_ticketHolder_attendees_email_fk" FOREIGN KEY ("ticketHolder") REFERENCES "public"."attendees"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_orders" ADD CONSTRAINT "application_orders_buyerId_users_id_fk" FOREIGN KEY ("buyerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_applicant_users_id_fk" FOREIGN KEY ("applicant") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticketHolder_attendees_email_fk" FOREIGN KEY ("ticketHolder") REFERENCES "public"."attendees"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "showcases" DROP COLUMN IF EXISTS "startDateTime";--> statement-breakpoint
ALTER TABLE "ticket_orders" DROP COLUMN IF EXISTS "pricePaidInCents";--> statement-breakpoint
ALTER TABLE "ticket_orders" DROP COLUMN IF EXISTS "updatedAt";--> statement-breakpoint
ALTER TABLE "ticket_orders" DROP COLUMN IF EXISTS "productId";--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN IF EXISTS "orderId";--> statement-breakpoint
ALTER TABLE "ticket_types" ADD CONSTRAINT "ticket_types_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");