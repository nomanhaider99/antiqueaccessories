import { NextResponse } from "next/server";
import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { eq, ilike, or, desc, inArray } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const q = searchParams.get("q");

    let query = db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));

    if (status) {
      query = query.where(eq(orders.status, status as any));
    }

    if (q) {
      query = query.where(
        or(
          ilike(orders.customer_name, `%${q}%`),
          ilike(orders.phone, `%${q}%`)
        )
      );
    }

    const data = await query;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customer_name,
      phone,
      city,
      house_number,
      street_number,
      address,
      shipping_mode,
      payment_mode,
      items,
    } = body;

    if (!items?.length) {
      return NextResponse.json(
        { message: "Order items are required" },
        { status: 400 }
      );
    }

    // 1️⃣ Fetch products securely
    const productIds = items.map((i: any) => i.product_id);

    const dbProducts = await db
      .select()
      .from(products)
      .where(inArray(products.id, productIds));

    if (dbProducts.length !== items.length) {
      return NextResponse.json(
        { message: "One or more products not found" },
        { status: 400 }
      );
    }

    // 2️⃣ Calculate prices
    let subtotal = 0;

    const calculatedItems = items.map((item: any) => {
      const product = dbProducts.find(p => p.id === item.product_id)!;
      const unitPrice = product.discountedPrice ?? product.price;
      const totalPrice = unitPrice * item.quantity;

      subtotal += totalPrice;

      return {
        product_id: product.id,
        quantity: item.quantity,
        price: totalPrice,
      };
    });

    const shipping_fee = shipping_mode === "express" ? 500 : 250;
    const total = subtotal + shipping_fee;

    const orderId = randomUUID();

    // 3️⃣ Transaction
    await db.transaction(async (tx) => {
      await tx.insert(orders).values({
        id: orderId,
        customer_name,
        phone,
        city,
        house_number,
        street_number,
        address,
        subtotal,
        shipping_fee,
        total,
        shipping_mode,
        payment_mode,
      });

      await tx.insert(orderItems).values(
        calculatedItems.map((item: any) => ({
          order_id: orderId,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        }))
      );
    });

    return NextResponse.json(
      {
        message: "Order placed successfully",
        orderId,
        subtotal,
        shipping_fee,
        total,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to place order",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
