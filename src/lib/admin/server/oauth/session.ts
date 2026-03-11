import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-secret-for-dev-only-change-in-prod";
const KEY = new TextEncoder().encode(JWT_SECRET);

export interface AdminUser {
  email: string;
  name?: string;
  picture?: string;
}

export async function createSession(user: AdminUser) {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(KEY);

  return token;
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, KEY);
    return payload as unknown as AdminUser;
  } catch (error) {
    return null;
  }
}
