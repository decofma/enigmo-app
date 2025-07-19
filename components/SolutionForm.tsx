// components/SolutionForm.tsx
"use client";
import { useState } from "react";

type Suspect = {
  id: string;
  name: string;
};

type Props = {
  gameId: string;
  suspects: Suspect[];
};

export default function SolutionForm({ gameId, suspects }: Props) {
  const [selectedCulprit, setSelectedCulprit] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCulprit) {
      alert("Você deve selecionar um suspeito!");
      return;
    }
    setIsLoading(true);

    const res = await fetch("/api/game/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, culpritId: selectedCulprit }),
    });

    setIsLoading(false);
    const data = await res.json();

    if (res.ok && data.correct) {
      alert("Correto! Você desvendou o mistério. Parabéns, detetive!");
      // Aqui você pode redirecionar para uma página de vitória ou mostrar mais detalhes.
    } else {
      alert("Incorreto. Parece que o verdadeiro culpado ainda está à solta. Revise as evidências.");
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6 rounded-lg text-center" style={{backgroundColor: 'var(--main-background)'}}>
      <h2 className="text-3xl font-bold mb-4">A Solução do Caso</h2>
      <p className="mb-6">Após analisar todas as provas, quem você acusa de ser o assassino de Darlene Montês?</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <select
          value={selectedCulprit}
          onChange={(e) => setSelectedCulprit(e.target.value)}
          className="w-full max-w-xs p-3 rounded"
          style={{backgroundColor: 'var(--secondary-background)', color: 'var(--main-text)'}}
          required
        >
          <option value="" disabled>Selecione o culpado...</option>
          {suspects.map((suspect) => (
            <option key={suspect.id} value={suspect.id}>
              {suspect.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full max-w-xs p-3 font-semibold rounded"
        >
          {isLoading ? "Analisando..." : "Acusar"}
        </button>
      </form>
    </section>
  );
}