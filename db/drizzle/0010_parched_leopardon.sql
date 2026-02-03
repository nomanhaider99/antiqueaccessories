ALTER TABLE "products" ALTER COLUMN "size" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "disclaimer" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "disclaimer" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "disclaimer" SET NOT NULL;