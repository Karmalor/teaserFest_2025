ALTER TABLE "tickets" DROP CONSTRAINT "tickets_tier_types_tier_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_tier_types_tier_fk" FOREIGN KEY ("tier") REFERENCES "public"."types"("tier") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
