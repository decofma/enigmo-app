// app/api/game/submit/route.ts
import { NextResponse } from "next/server";
import { caseData } from "../../../../lib/case-data";

export async function POST(req: Request) {
  try {
    const { gameId, culpritId } = await req.json();

    if (!gameId || !culpritId) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
    }

    const game = caseData[gameId];

    if (!game) {
      return NextResponse.json({ error: "Jogo não encontrado." }, { status: 404 });
    }

    // Em uma aplicação real, você buscaria a solução do seu banco de dados.
    // Nunca exponha a solução no lado do cliente.
    const isCorrect = game.solution.culpritId === culpritId;

    // Você poderia adicionar lógica aqui para registrar a tentativa do usuário no DB.

    return NextResponse.json({ correct: isCorrect });

  } catch (error) {
    console.error("Erro ao submeter solução:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}