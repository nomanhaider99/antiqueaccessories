import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signAdminToken(payload: { id: string; username: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    id: string;
    username: string;
  };
}
