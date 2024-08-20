ALTER TABLE "users_table" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "firstName" text;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "lastName" text;--> statement-breakpoint
ALTER TABLE "users_table" DROP COLUMN IF EXISTS "fullName";