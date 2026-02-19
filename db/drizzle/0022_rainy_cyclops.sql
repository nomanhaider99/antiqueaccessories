ALTER TABLE "products" ALTER COLUMN "category" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category" SET DEFAULT '[]'::jsonb;