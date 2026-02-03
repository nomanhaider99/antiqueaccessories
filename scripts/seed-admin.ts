import bcrypt from "bcryptjs";
import { db } from "@/db";
import { admins } from "@/db/schema";

async function seedAdmin() {
  const password = await bcrypt.hash("admin123", 12);

  await db.insert(admins).values({
    username: "admin",
    password_hash: password,
  });

  console.log("✅ Admin user created");
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("❌ Failed to seed admin", err);
  process.exit(1);
});
