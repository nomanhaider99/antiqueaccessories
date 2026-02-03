import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      article,
      category,
      collection,
      price,
      type,
      size,
      availability = "available",
      description,
      discount = 0,
      discountedPrice,
      deliveryTime = [],
      images,
      disclaimer = "",
    } = body;

    if (!article || !category || !collection || !price || !type || !size || !description || !discountedPrice || !images) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db.insert(products).values({
      article,
      category,
      collection,
      price,
      type,
      size,
      availability,
      description,
      discount,
      discountedPrice,
      deliveryTime,
      images,
      disclaimer,
    }).returning();

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await db.select().from(products)

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("GET /api/products error:", error)

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}