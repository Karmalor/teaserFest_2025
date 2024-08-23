ALTER TABLE "users_table" DROP CONSTRAINT "users_table_orders_application_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users_table" DROP COLUMN IF EXISTS "orders";