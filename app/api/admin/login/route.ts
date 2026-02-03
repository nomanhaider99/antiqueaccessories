import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
  }

  const admin = await db.query.admins.findFirst({
    where: eq(admins.username, username),
  });

  if (!admin) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
  }

  const token = signAdminToken({ id: admin.id, username: admin.username });

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
