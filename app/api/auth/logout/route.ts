// app/api/auth/logout/route.ts
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const serializedCookie = serialize("session-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Set-Cookie": serializedCookie },
  });
}