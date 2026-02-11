ALTER TABLE "products" RENAME COLUMN "article" TO "category";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "title" varchar(120) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "collection";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "size";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "disclaimer";--> statement-breakpoint
DROP TYPE "public"."product_type";