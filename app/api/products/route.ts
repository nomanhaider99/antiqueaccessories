import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get("collection");

    let query = db.select().from(products).$dynamic();

    if (collection) {
      query = query.where(eq(products.collection, collection));
    }

    const data = await query;
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
