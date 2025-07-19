// app/api/serial/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Serials from "../../../lib/models/Serials";

export async function POST(req: Request) {
  await dbConnect();

  const { code } = await req.json();

  const serialFromDb = await Serials.findOne({ code });

  if (!serialFromDb) {
    return NextResponse.json({ error: "Serial inválido" }, { status: 400 });
  }

  if (serialFromDb.premium ) {
    return NextResponse.json({ valid: true });
  }

  if (serialFromDb.used) {
    return NextResponse.json({ error: "Serial já utilizado" }, { status: 400 });
  }

  serialFromDb.used = true;
  await serialFromDb.save();

  return NextResponse.json({ valid: true });
}