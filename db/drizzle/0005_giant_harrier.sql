ALTER TABLE "products" RENAME COLUMN "article" TO "title";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "delivery_time" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "disclaimer" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "category";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "collection";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "size";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "discounted_price";