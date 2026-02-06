ALTER TABLE "orders" ADD COLUMN "currency" varchar(3) DEFAULT 'PKR' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "exchange_rate" real NOT NULL;