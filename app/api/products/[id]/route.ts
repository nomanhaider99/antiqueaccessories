import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/products/[id]'>
) {
  try {
    const { id } = await ctx.params;

    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!result.length) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: result[0] });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

/* DELETE PRODUCT */
export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<'/api/products/[id]'>
) {
  try {
    const { id } = await ctx.params;

    const deleted = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!deleted.length) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully", data: deleted[0] }
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
  req: NextRequest,
  ctx: RouteContext<'/api/products/[id]'>
) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();

    const updated = await db
      .update(products)
      .set(body)
      .where(eq(products.id, id))
      .returning();

    if (!updated.length) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product updated successfully",
      data: updated[0],
    });
  } catch (error) {
    console.error("PATCH /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
