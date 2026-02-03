ALTER TABLE "products" ALTER COLUMN "delivery_time" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "delivery_time" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "disclaimer" DROP NOT NULL;