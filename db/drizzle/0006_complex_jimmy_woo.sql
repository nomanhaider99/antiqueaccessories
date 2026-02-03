ALTER TABLE "products" RENAME COLUMN "title" TO "article";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "delivery_time" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "disclaimer" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "category" varchar(120) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "collection" varchar(120) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "size" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "discounted_price" real NOT NULL;