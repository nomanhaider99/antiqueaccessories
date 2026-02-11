import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const data = category
      ? await db.select().from(products).where(eq(products.category, category))
      : await db.select().from(products);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      title,
      category,
      price,
      availability,
      description,
      discount,
      discountedPrice,
      deliveryTime,
      images,
    } = body

    // ---- Validation ----
    if (
      !title ||
      !category ||
      !price ||
      !description ||
      !images?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (discount < 0 || discount > 99) {
      return NextResponse.json(
        { error: "Invalid discount value" },
        { status: 400 }
      )
    }

    // ---- Insert ----
    const [product] = await db
      .insert(products)
      .values({
        title,
        category,
        price,
        availability,
        description,
        discount,
        discountedPrice,
        deliveryTime,
        images,
      })
      .returning()

    return NextResponse.json(product, { status: 201 })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}