ALTER TABLE "tickets" DROP CONSTRAINT "tickets_tier_types_tier_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "filePath";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "imageUrl";--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN IF EXISTS "tier";--> statement-breakpoint
ALTER TABLE "types" DROP COLUMN IF EXISTS "tier";