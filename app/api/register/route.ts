// app/api/register/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Users from "../../../lib/models/Users";
import bcrypt from "bcryptjs";

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

  return NextResponse.json({ success: true, userId: newUser._id });
}
