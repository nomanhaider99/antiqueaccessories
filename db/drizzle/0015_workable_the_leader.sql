ALTER TABLE "orders" ALTER COLUMN "shipping_mode" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_mode" SET DEFAULT 'standard'::text;--> statement-breakpoint
DROP TYPE "public"."shipping_mode";--> statement-breakpoint
CREATE TYPE "public"."shipping_mode" AS ENUM('standard');--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_mode" SET DEFAULT 'standard'::"public"."shipping_mode";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "shipping_mode" SET DATA TYPE "public"."shipping_mode" USING "shipping_mode"::"public"."shipping_mode";