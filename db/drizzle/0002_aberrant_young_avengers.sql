ALTER TABLE "products" ALTER COLUMN "article" SET DATA TYPE varchar(120);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category" SET DATA TYPE varchar(120);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "collection" SET DATA TYPE varchar(120);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "size" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "availability" SET DEFAULT 'available';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "delivery_time" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "images" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "disclaimer" SET DATA TYPE jsonb;