import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { eq, ilike, or, desc, inArray, and } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const q = searchParams.get("q");

    const conditions = [];

    if (status) {
      conditions.push(eq(orders.status, status as any));
    }

    if (q) {
      conditions.push(
        or(
          ilike(orders.customer_name, `%${q}%`),
          ilike(orders.phone, `%${q}%`)
        )
      );
    }

    const data = await db
      .select()
      .from(orders)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(orders.createdAt));

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
      country
    } = body;

    if (!items?.length) {
      return NextResponse.json(
        { message: "Order items are required" },
        { status: 400 }
      );
    }

    const productIds = items.map((i: any) => i.product_id);

    const dbProducts = await db
      .select()
      .from(products)
      .where(inArray(products.id, productIds));

    let subtotal = 0;

    const calculatedItems = items.map((item: any) => {
      const product = dbProducts.find(p => p.id === item.product_id)!;
      const unitPrice = product.discountedPrice ?? product.price;
      const totalPrice = unitPrice * item.quantity;

      subtotal += totalPrice;

      return {
        product_id: product.id,
        size: item.size,
        quantity: item.quantity,
        price: totalPrice,
      };
    });


    const shipping_fee = shipping_mode === "express" ? 399 : 199;
    const total = subtotal + shipping_fee;

    const orderId = randomUUID();

    await db.transaction(async (tx) => {
      await tx.insert(orders).values({
        id: orderId,
        customer_name,
        phone,
        city,
        country,
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
          size: item.size,          
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
