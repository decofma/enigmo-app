// components/SolutionForm.tsx
"use client";
import { useState } from "react";
import Modal from "./Modal";
import Image from 'next/image'; 

type Suspect = {
  id: string;
  name: string;
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
      alert("Você deve selecionar um suspeito para acusar!");
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
      <section className="max-w-4xl mx-auto p-6 rounded-lg text-center ">
        <h2 className="text-3xl font-bold mb-4" style={{color: 'var(--main-title)'}}>Faça sua Acusação</h2>
        <p className="mb-8" style={{color: 'var(--details)'}}>Selecione o suspeito que você acredita ser o responsável pelo crime.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8" style={{ backgroundColor: 'var(--secondary-background)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 w-full p-6" style={{ border: '1px solid var(--details)', borderRadius: '10px'}}>
            {suspects.map((suspect) => (
              <button
                type="button" 
                key={suspect.id}
                onClick={() => setSelectedCulprit(suspect.id)}
                className={`p-2 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 ${selectedCulprit === suspect.id ? 'ring-2 opacity-100' : 'ring-1 ring-transparent opacity-70 hover:opacity-100'}`}
                style={{
                  backgroundColor: 'var(--secondary-background)',
                  borderColor: 'var(--main-hover)',
                }}
              >
                <Image
                  src={`/suspeitos/suspeito-${suspect.id}.png`}
                  alt={`Foto de ${suspect.name}`}
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
                <span className="font-semibold text-sm">{suspect.name}</span>
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || !selectedCulprit} 
            className="w-full max-w-xs p-3 font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Analisando..." : "Confirmar Acusação"}
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