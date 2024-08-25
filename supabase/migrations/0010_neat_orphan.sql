ALTER TABLE "application_orders" RENAME COLUMN "buyer" TO "buyerId";--> statement-breakpoint
ALTER TABLE "application_orders" DROP CONSTRAINT "application_orders_buyer_users_table_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_orders" ADD CONSTRAINT "application_orders_buyerId_users_table_id_fk" FOREIGN KEY ("buyerId") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
