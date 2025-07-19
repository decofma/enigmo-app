// app/api/login/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Users from "../../../lib/models/Users";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();

  const { username, password } = await req.json();

  const user = await Users.findOne({ username });
  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado." },
      { status: 404 }
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    user: { id: user._id, username: user.username },
  });
}
