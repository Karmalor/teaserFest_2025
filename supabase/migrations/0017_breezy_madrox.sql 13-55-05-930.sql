DO $$ BEGIN
 IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name='form_submissions' AND column_name='uuid') THEN
      ALTER TABLE form_submissions ADD COLUMN uuid UUID;
   END IF;
   
 CREATE TYPE "public"."role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "role" SET DATA TYPE role;--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "role" SET DEFAULT 'user';


