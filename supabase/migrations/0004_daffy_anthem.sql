DO $$ BEGIN
 ALTER TABLE "users_table" ADD CONSTRAINT "users_table_orders_application_orders_id_fk" FOREIGN KEY ("orders") REFERENCES "public"."application_orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
