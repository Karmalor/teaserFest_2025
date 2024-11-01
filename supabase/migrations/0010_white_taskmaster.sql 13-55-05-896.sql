CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"priceInCents" integer,
	"filePath" text,
	"imageUrl" text,
	"description" text,
	"isAvailableForPurchase" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets" (
	"id" uuid PRIMARY KEY NOT NULL,
	"tier" text,
	"showcase" text,
	"ticketHolder" text,
	"isComp" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"orderId" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_tier_types_tier_fk" FOREIGN KEY ("tier") REFERENCES "public"."types"("tier") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_showcase_types_showcase_fk" FOREIGN KEY ("showcase") REFERENCES "public"."types"("showcase") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticketHolder_users_table_id_fk" FOREIGN KEY ("ticketHolder") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_orderId_ticket_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."ticket_orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
