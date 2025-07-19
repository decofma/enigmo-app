// app/game/[gameId]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { caseData } from "../../../lib/case-data";
import SolutionForm from "../../../components/SolutionForm";
import { IEvidence, IInterrogation, ISuspect } from "../../../types";

// PASSO 1: Adicionar 'briefing' como uma opção de aba
type Tab = 'briefing' | 'dossiers' | 'evidence' | 'interrogations';

export default function GamePage() {
  // PASSO 2: Definir 'briefing' como a aba inicial
  const [activeTab, setActiveTab] = useState<Tab>('briefing');
  const params = useParams();
  const gameId = params.gameId as string;
  
  const game = caseData[gameId];

  if (!game) {
    return <div className="text-center p-10">Caso não encontrado.</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      // PASSO 3: Adicionar um novo 'case' para renderizar a mensagem do cliente
      case 'briefing':
        return (
          <div className="max-w-3xl mx-auto p-6 rounded-lg" style={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--details)' }}>
            <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--main-title)'}}>Mensagem do Cliente</h3>
            <p className="text-lg italic whitespace-pre-wrap" style={{ color: 'var(--main-text)' }}>
              {game.clientMessage}
            </p>
          </div>
        );
      case 'dossiers':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {game.suspects.map((s: ISuspect) => (
              <div key={s.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--details)' }}>
                <h3 className="text-xl font-bold" style={{color: 'var(--main-title)'}}>{s.name}</h3>
                <p className="mt-2"><strong>Perfil:</strong> {s.profile}</p>
                <p className="mt-1"><strong>Álibi:</strong> {s.alibi}</p>
              </div>
            ))}
          </div>
        );
      case 'evidence':
        return (
          <div className="space-y-4">
            {game.evidence.map((e: IEvidence) => (
              <div key={e.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--details)' }}>
                <h3 className="font-bold" style={{color: 'var(--main-title)'}}>[{e.id}] - {e.title}</h3>
                <p className="mt-2 whitespace-pre-wrap">{e.content}</p>
              </div>
            ))}
          </div>
        );
      case 'interrogations':
        return (
          <div className="space-y-4">
             {game.interrogations.map((i: IInterrogation) => (
              <div key={i.suspect} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--details)' }}>
                <h3 className="font-bold" style={{color: 'var(--main-title)'}}>{i.suspect}</h3>
                <p className="mt-2 italic whitespace-pre-wrap">"{i.transcript}"</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen text-white p-4 sm:p-8">
      <h1 className="text-4xl font-bold text-center mb-2" style={{color: 'var(--main-title)'}}>{game.title}</h1>
      <hr className="my-6" style={{borderColor: 'var(--details)'}}/>

      <div className="mb-6">
        <div className="flex justify-center border-b" style={{borderColor: 'var(--details)'}}>
          {/* PASSO 4: Adicionar o botão para a nova aba 'Briefing' */}
          <button onClick={() => setActiveTab('briefing')} className={`py-2 px-4 text-lg ${activeTab === 'briefing' ? 'border-b-2' : ''}`} style={{borderColor: activeTab === 'briefing' ? 'var(--main-title)' : 'transparent'}}>Briefing</button>
          <button onClick={() => setActiveTab('dossiers')} className={`py-2 px-4 text-lg ${activeTab === 'dossiers' ? 'border-b-2' : ''}`} style={{borderColor: activeTab === 'dossiers' ? 'var(--main-title)' : 'transparent'}}>Dossiês</button>
          <button onClick={() => setActiveTab('evidence')} className={`py-2 px-4 text-lg ${activeTab === 'evidence' ? 'border-b-2' : ''}`} style={{borderColor: activeTab === 'evidence' ? 'var(--main-title)' : 'transparent'}}>Evidências</button>
          <button onClick={() => setActiveTab('interrogations')} className={`py-2 px-4 text-lg ${activeTab === 'interrogations' ? 'border-b-2' : ''}`} style={{borderColor: activeTab === 'interrogations' ? 'var(--main-title)' : 'transparent'}}>Interrogatórios</button>
        </div>
      </div>
      
      <div className="mb-8">
        {renderContent()}
      </div>

      <hr className="my-8" style={{borderColor: 'var(--details)'}}/>

      <SolutionForm gameId={gameId} suspects={game.suspects} />
    </main>
  );
}