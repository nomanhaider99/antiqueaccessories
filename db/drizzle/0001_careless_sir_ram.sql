ALTER TABLE "order_items" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "order_items" CASCADE;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "availability" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "delivery_time" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "images" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "disclaimer" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "article" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "category" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "collection" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "size" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "discounted_price" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "title";