ALTER TABLE "application_orders" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "application_orders" ADD COLUMN "createAt" date;--> statement-breakpoint
ALTER TABLE "application_orders" ADD COLUMN "amount" text;--> statement-breakpoint
ALTER TABLE "application_orders" ADD COLUMN "buyer" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_orders" ADD CONSTRAINT "application_orders_buyer_users_table_id_fk" FOREIGN KEY ("buyer") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
