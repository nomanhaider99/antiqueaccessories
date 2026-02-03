import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // 1. Get order
    const order = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1);

    if (!order.length) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    // 2. Get order items with full product details
    const items = await db
      .select({
        orderItemId: orderItems.id,
        quantity: orderItems.quantity,
        itemPrice: orderItems.price,

        product: {
          id: products.id,
          article: products.article,
          category: products.category,
          collection: products.collection,
          price: products.price,
          discountedPrice: products.discountedPrice,
          type: products.type,
          size: products.size,
          availability: products.availability,
          description: products.description,
          deliveryTime: products.deliveryTime,
          images: products.images,
          disclaimer: products.disclaimer,
        },
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.product_id, products.id))
      .where(eq(orderItems.order_id, id));

    return NextResponse.json(
      {
        message: "Order retrieved successfully",
        data: {
          ...order[0],
          items,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error retrieving order",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}


const VALID_STATUSES = ["pending", "accepted", "completed", "rejected"] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await request.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { message: "Invalid status" },
      { status: 400 }
    );
  }

  await db
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(eq(orders.id, id));

  return NextResponse.json(
    { message: "Order status updated" },
    { status: 200 }
  );
}