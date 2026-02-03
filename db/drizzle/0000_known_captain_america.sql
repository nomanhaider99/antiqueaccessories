CREATE TYPE "public"."order_status" AS ENUM('pending', 'accepted', 'completed', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."payment_mode" AS ENUM('cash', 'advance');--> statement-breakpoint
CREATE TYPE "public"."product_availability" AS ENUM('available', 'sold-out');--> statement-breakpoint
CREATE TYPE "public"."product_type" AS ENUM('stitched', 'unstitched');--> statement-breakpoint
CREATE TYPE "public"."shipping_mode" AS ENUM('standard', 'express');--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"price" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_name" text NOT NULL,
	"city" text NOT NULL,
	"house_number" text,
	"street_number" text,
	"address" text NOT NULL,
	"phone" text NOT NULL,
	"subtotal" real NOT NULL,
	"shipping_mode" "shipping_mode" DEFAULT 'standard' NOT NULL,
	"payment_mode" "payment_mode" DEFAULT 'cash' NOT NULL,
	"shipping_fee" real NOT NULL,
	"total" real NOT NULL,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"type" "product_type" NOT NULL,
	"availability" "product_availability" DEFAULT 'available' NOT NULL,
	"description" text NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"delivery_time" text NOT NULL,
	"images" jsonb NOT NULL,
	"disclaimer" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;