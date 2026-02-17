import {
  pgTable,
  text,
  real,
  jsonb,
  uuid,
  integer,
  timestamp,
  varchar,  
} from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum("order_status", ["pending", "accepted", "completed", "rejected"]);

export const shippingModeEnum = pgEnum("shipping_mode", ["standard"]);

export const paymentModeEnum = pgEnum("payment_mode", ["cash", "advance"]);

export const orders = pgTable("orders", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),
  customer_name: text("customer_name")
    .notNull(),
  city: text("city")
    .notNull(),
  house_number: text("house_number"),
  street_number: text("street_number"),
  address: text("address")
    .notNull(),
  phone: text("phone")
    .notNull(),
  subtotal: real("subtotal")
    .notNull(),
  shipping_mode: shippingModeEnum("shipping_mode")
    .notNull()
    .default('standard'),
  payment_mode: paymentModeEnum("payment_mode")
    .notNull()
    .default('cash'),
  shipping_fee: real("shipping_fee")
    .notNull(),
  total: real("total")
    .notNull(),
  status: orderStatusEnum("status")
    .notNull()
    .default("pending"),
  currency: varchar("currency", { length: 3 })
    .notNull()
    .default("PKR"),

  exchange_rate: real("exchange_rate")
    .notNull(), 

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const productAvailabilityEnum = pgEnum("product_availability", [
  "available",
  "sold-out",
]);

export const products = pgTable("products", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  title: varchar("title", { length: 120 })
    .notNull(),

  category: varchar("category", { length: 120 })
    .notNull(),

  price: real("price")
    .notNull(),

  availability: productAvailabilityEnum("availability")
    .default("available")
    .notNull(),

  description: text("description")
    .notNull(),

  discount: integer("discount")
    .default(0)
    .notNull(),

  discountedPrice: real("discounted_price")
    .notNull(),

  deliveryTime: jsonb("delivery_time")
    .$type<string[]>()
    .default([]),

  images: jsonb("images")
    .$type<string[]>()
    .notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  order_id: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  quantity: integer("quantity")
    .notNull()
    .default(1),

  price: real("price")
    .notNull(),
});


export const admins = pgTable("admins", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),
  username: varchar("username", { length: 100 })
    .notNull()
    .unique(),
  password_hash: text("password_hash")
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});