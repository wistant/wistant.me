import { NextRequest, NextResponse } from "next/server";
import { getGoogleOAuthTokens, getGoogleUser } from "@/admin/server/oauth/google";
import { createSession } from "@/admin/server/oauth/session";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code not found" }, { status: 400 });
  }

  try {
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    const user = await getGoogleUser({ id_token, access_token });

    // ZERO-TRUST SECURITY: Only allow specific allowed emails.
    const allowedEmails = [
      "wistantkode@gmail.com",
      process.env.ADMIN_EMAIL // fallback if configured in .env
    ].filter(Boolean);

    if (!allowedEmails.includes(user.email)) {
      console.warn(`Unauthorized login attempt from ${user.email}`);
      return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
    }

    // Create a secure session with Jose
    const sessionToken = await createSession({
      email: user.email,
      name: user.name,
      picture: user.picture,
    });

    // Set HTTP-Only Cookie
    const response = NextResponse.redirect(new URL("/admin", req.url));
    response.cookies.set({
      name: "admin_token",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect(new URL("/?error=oauth_failed", req.url));
  }
}
