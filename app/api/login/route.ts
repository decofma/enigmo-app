// app/api/login/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Users from "../../../lib/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

export async function POST(req: Request) {
  await dbConnect();

  const { username, password } = await req.json();

  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || "default-secret";

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secret,
      { expiresIn: MAX_AGE }
    );

    const serializedCookie = serialize("session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Set-Cookie": serializedCookie },
    });

  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}