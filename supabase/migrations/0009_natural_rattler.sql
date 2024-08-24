ALTER TABLE "application_orders" ALTER COLUMN "applicationSubmitted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "application_orders" DROP COLUMN IF EXISTS "createdAt";