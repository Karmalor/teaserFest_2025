ALTER TABLE "ticket_orders" RENAME COLUMN "amount" TO "pricePaidInCents";--> statement-breakpoint
ALTER TABLE "ticket_orders" RENAME COLUMN "buyerId" TO "buyer";--> statement-breakpoint
ALTER TABLE "ticket_orders" DROP CONSTRAINT "ticket_orders_buyerId_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "ticket_orders" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "ticket_orders" ALTER COLUMN "pricePaidInCents" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "ticket_orders" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "ticket_orders" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "ticket_orders" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "ticket_orders" ADD COLUMN "productId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket_orders" ADD CONSTRAINT "ticket_orders_buyer_users_table_id_fk" FOREIGN KEY ("buyer") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket_orders" ADD CONSTRAINT "ticket_orders_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
