// app/api/register/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Users from "../../../lib/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

export async function POST(req: Request) {
  await dbConnect();

  const { username, email, password, serial } = await req.json();

  const existingUser = await Users.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await Users.create({
    username,
    email,
    password: hashedPassword,
    serial,
  });

  const secret = process.env.JWT_SECRET || "default-secret";

  const token = jwt.sign(
    { userId: newUser._id, username: newUser.username },
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
    status: 201, 
    headers: { "Set-Cookie": serializedCookie },
  });
}
