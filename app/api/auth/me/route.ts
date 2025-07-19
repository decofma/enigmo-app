// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("session-token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET || "default-secret";

  try {
    const decoded = jwt.verify(token, secret);
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}