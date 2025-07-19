// components/SolutionForm.tsx
"use client";
import { useState } from "react";
import Modal from "./Modal"; 
type Suspect = {
  id: string;
  name:string;
};

type Props = {
  gameId: string;
  suspects: Suspect[];
};

type ResultState = {
  isCorrect: boolean;
  title: string;
  message: string;
} | null;

export default function SolutionForm({ gameId, suspects }: Props) {
  const [selectedCulprit, setSelectedCulprit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<ResultState>(null);

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

    const data = await res.json();
    setIsLoading(false);

    if (res.ok && data.correct) {
      setResult({
        isCorrect: true,
        title: "Mistério Resolvido!",
        message: "Suas deduções estavam impecáveis e o verdadeiro culpado foi revelado. Parabéns, detetive!"
      });
    } else {
      setResult({
        isCorrect: false,
        title: "Pista Falsa...",
        message: "Sua acusação não se sustenta com as provas. O verdadeiro culpado continua à solta. Revise o caso e tente novamente."
      });
    }
    setIsModalOpen(true);
  };

  return (
    <>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {result && (
          <div className="flex flex-col items-center gap-4">
            <div className={`text-6xl ${result.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {result.isCorrect ? '✓' : '✗'}
            </div>
            <h2 className="text-3xl font-bold" style={{color: 'var(--main-title)'}}>{result.title}</h2>
            <p className="text-md" style={{color: 'var(--main-text)'}}>{result.message}</p>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-6 py-2 font-semibold rounded"
            >
              Fechar
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}