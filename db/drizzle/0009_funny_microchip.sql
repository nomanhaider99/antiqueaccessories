ALTER TABLE "products" ALTER COLUMN "delivery_time" SET DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "disclaimer" SET DEFAULT '[]'::jsonb;