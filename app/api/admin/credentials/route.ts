import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request) {
  const token = (await cookies())?.get("admin_token")?.value;

  console.log('Token: ', token)
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = verifyAdminToken(token);
  const { username, password_hash } = await req.json();

  const updateData: any = {};

  if (username) updateData.username = username;
  if (password_hash) updateData.password_hash = await bcrypt.hash(password_hash, 12);

  await db
    .update(admins)
    .set(updateData)
    .where(eq(admins.id, id));

  return NextResponse.json({ success: true });
}
