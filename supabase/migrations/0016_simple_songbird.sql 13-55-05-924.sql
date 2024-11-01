ALTER TABLE "types" RENAME TO "ticketTypes";--> statement-breakpoint
ALTER TABLE "ticketTypes" RENAME COLUMN "price" TO "priceInCents";--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_showcase_types_showcase_fk";
--> statement-breakpoint
ALTER TABLE "ticketTypes" DROP CONSTRAINT "types_showcase_showcase_title_fk";
--> statement-breakpoint
ALTER TABLE "ticketTypes" ALTER COLUMN "priceInCents" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "ticketTypes" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "ticketTypes" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "ticketTypes" ADD COLUMN "isAvailableForPurchase" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "ticketTypes" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "ticketTypes" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "role" text;--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN IF EXISTS "showcase";--> statement-breakpoint
ALTER TABLE "ticketTypes" DROP COLUMN IF EXISTS "showcase";--> statement-breakpoint
ALTER TABLE "ticketTypes" DROP COLUMN IF EXISTS "capacity";