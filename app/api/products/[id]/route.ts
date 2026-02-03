import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, id));

    return NextResponse.json({ data: result[0] });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Product id is required" },
        { status: 400 }
      );
    }

    const deleted = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully", data: deleted[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    const body = await req.json();

    const {
      article,
      category,
      collection,
      price,
      discountedPrice,
      type,
      size,
      availability,
      discount,
      images,
      description,
      deliveryTime,
      disclaimer,
    } = body;

    if (!article || !category || !collection || !price || !type || !size || !discountedPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(products)
      .set({
        article,
        category,
        collection,
        price,
        discountedPrice,
        type,
        size,
        availability,
        discount,
        images,
        description,
        deliveryTime,
        disclaimer,
      })
      .where(eq(products.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product updated successfully", data: updated[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/products/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}