// app/game/[gameId]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from 'next/image';
import { caseData } from "../../../lib/case-data";
import SolutionForm from "../../../components/SolutionForm";
import SkeletonCard from "../../../components/SkeletonCard";
import Modal from "../../../components/Modal"; // Importa o nosso modal reutilizável
import { ICaseData, IEvidence, IInterrogation, ISuspect } from "../../../types";

type Tab = 'briefing' | 'dossiers' | 'evidence' | 'interrogations' | 'acusacao';

interface PageState {
  title: string | null;
  suspectsForSolution: ISuspect[];
  tabs: {
    briefing: { isLoading: boolean; data: string | null };
    dossiers: { isLoading: boolean; data: ISuspect[] | null };
    evidence: { isLoading: boolean; data: IEvidence[] | null };
    interrogations: { isLoading: boolean; data: IInterrogation[] | null };
  };
}

export default function GamePage() {
  const [activeTab, setActiveTab] = useState<Tab>('briefing');
  const params = useParams();
  const [selectedSuspect, setSelectedSuspect] = useState<ISuspect | null>(null);
  const [pageState, setPageState] = useState<PageState>({
    title: null,
    suspectsForSolution: [],
    tabs: {
      briefing: { isLoading: true, data: null },
      dossiers: { isLoading: false, data: null },
      evidence: { isLoading: false, data: null },
      interrogations: { isLoading: false, data: null },
    }
  });

  useEffect(() => {
    if (activeTab === 'acusacao') return;

    const gameId = params.gameId as string;
    const gameSourceData = caseData[gameId];

    if (!gameSourceData) {
      setPageState(prev => ({ ...prev, title: "NOT_FOUND" }));
      return;
    }

    if (pageState.title === null) {
      setPageState(prev => ({
        ...prev,
        title: gameSourceData.title,
        suspectsForSolution: gameSourceData.suspects
      }));
    }

    // @ts-ignore
    const currentTabData = pageState.tabs[activeTab];

    if (currentTabData.data !== null) {
      return;
    }

    // @ts-ignore
    setPageState(prev => ({
      ...prev,
      // @ts-ignore
      tabs: { ...prev.tabs, [activeTab]: { isLoading: true, data: null } },
    }));

    const timer = setTimeout(() => {
      let dataForTab;
      switch (activeTab) {
        case 'briefing': dataForTab = gameSourceData.clientMessage; break;
        case 'dossiers': dataForTab = gameSourceData.suspects; break;
        case 'evidence': dataForTab = gameSourceData.evidence; break;
        case 'interrogations': dataForTab = gameSourceData.interrogations; break;
        default: dataForTab = null;
      }
      
      // @ts-ignore
      setPageState(prev => ({
        ...prev,
        // @ts-ignore
        tabs: { ...prev.tabs, [activeTab]: { isLoading: false, data: dataForTab as any } },
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeTab, params.gameId, pageState.title]);
  
  if (pageState.title === "NOT_FOUND") {
    return <div className="text-center p-10">Caso não encontrado.</div>;
  }
  
  if (pageState.title === null) {
    return (
      <main className="min-h-screen text-white p-4 sm:p-8 animate-pulse">
        <div className="h-10 bg-gray-700 rounded-md w-1/2 mx-auto mb-2"></div>
        <hr className="my-6" style={{ borderColor: 'var(--details)' }}/>
        <div className="flex justify-center mb-6"> <div className="h-8 bg-gray-700 rounded-md w-48"></div> </div>
      </main>
    )
  }

  const renderContent = () => {
    if (activeTab === 'acusacao') {
      return <SolutionForm gameId={params.gameId as string} suspects={pageState.suspectsForSolution} />;
    }

    // @ts-ignore
    const tabState = pageState.tabs[activeTab];

    if (tabState.isLoading) {
      if (activeTab === 'dossiers') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: pageState.suspectsForSolution.length || 9 }).map((_, index) => <SkeletonCard key={index} />)}
          </div>
        );
      }
      return <div className="text-center p-10 text-lg">Carregando informações...</div>;
    }
    
    switch (activeTab) {
      case 'briefing':
        // @ts-ignore
        const briefingData = pageState.tabs.briefing.data;
        return (
          <div className="max-w-3xl mx-auto p-6 rounded-lg" style={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--details)' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--main-text)' }}>Mensagem do Cliente</h3>
            <p className="text-lg italic whitespace-pre-wrap" style={{ color: 'var(--details)' }}>{briefingData}</p>
          </div>
        );
      case 'dossiers':
        // @ts-ignore
        const dossiersData = pageState.tabs.dossiers.data || [];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dossiersData.map((s: ISuspect) => (
              <div key={s.id} className="p-4 rounded-lg flex flex-col items-center text-center" style={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--details)' }}>
                <div onClick={() => setSelectedSuspect(s)} className="cursor-pointer transition-transform duration-200 hover:scale-110">
                  <Image
                    src={`/suspeitos/suspeito-${s.id}.png`}
                    alt={`Foto de ${s.name}`}
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-2"
                    style={{ borderColor: 'var(--details)' }}
                  />
                </div>
                <h3 className="text-xl font-bold mt-4" style={{ color: 'var(--main-text)' }}>{s.name}</h3>
                <div className="text-left w-full mt-4">
                  <p className="mt-2 text-sm" style={{ color: 'var(--details)' }}><strong>Perfil:</strong> {s.profile}</p>
                  <p className="mt-1 text-sm" style={{ color: 'var(--details)' }}><strong>Álibi:</strong> {s.alibi}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'evidence':
        // @ts-ignore
        const evidenceData = pageState.tabs.evidence.data || [];
        return (
          <div className="space-y-4">
            {evidenceData.map((e: IEvidence) => (
              <div key={e.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--details)' }}>
                <h3 className="font-bold" style={{ color: 'var(--main-text)' }}>[{e.id}] - {e.title}</h3>
                <p className="mt-2 whitespace-pre-wrap" style={{ color: 'var(--details)' }}>{e.content}</p>
              </div>
            ))}
          </div>
        );
      case 'interrogations':
        // @ts-ignore
        const interrogationsData = pageState.tabs.interrogations.data || [];
        return (
          <div className="space-y-4">
            {interrogationsData.map((i: IInterrogation) => (
              <div key={i.suspect} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--details)' }}>
                <h3 className="font-bold" style={{ color: 'var(--main-text)' }}>{i.suspect}</h3>
                <p className="mt-2 italic whitespace-pre-wrap" style={{ color: 'var(--details)' }}>"{i.transcript}"</p>
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
      <h1 className="text-4xl font-bold text-center mb-2" style={{ color: 'var(--main-title)' }}>{pageState.title}</h1>
      <hr className="my-6" style={{ borderColor: 'var(--details)' }}/>
      
      <div className="mb-6">
        <div className="border-b" style={{ borderColor: 'var(--details)' }}>
          <div className="flex flex-wrap justify-center -mb-px">
            <button onClick={() => setActiveTab('briefing')} className={`px-4 py-2 text-lg rounded-t-lg border-b-2 transition-colors duration-200 ${activeTab === 'briefing' ? 'font-bold' : 'font-normal'}`}
              style={{ backgroundColor: activeTab === 'briefing' ? 'var(--main-title)' : 'transparent', borderColor: activeTab === 'briefing' ? 'var(--main-title)' : 'transparent', color: activeTab === 'briefing' ? 'var(--main-text)' : 'var(--details)' }}>
              Briefing
            </button>
            <button onClick={() => setActiveTab('dossiers')} className={`px-4 py-2 text-lg rounded-t-lg border-b-2 transition-colors duration-200 ${activeTab === 'dossiers' ? 'font-bold' : 'font-normal'}`}
              style={{ backgroundColor: activeTab === 'dossiers' ? 'var(--main-title)' : 'transparent', borderColor: activeTab === 'dossiers' ? 'var(--main-title)' : 'transparent', color: activeTab === 'dossiers' ? 'var(--main-text)' : 'var(--details)' }}>
              Dossiês
            </button>
            <button onClick={() => setActiveTab('evidence')} className={`px-4 py-2 text-lg rounded-t-lg border-b-2 transition-colors duration-200 ${activeTab === 'evidence' ? 'font-bold' : 'font-normal'}`}
              style={{ backgroundColor: activeTab === 'evidence' ? 'var(--main-title)' : 'transparent', borderColor: activeTab === 'evidence' ? 'var(--main-title)' : 'transparent', color: activeTab === 'evidence' ? 'var(--main-text)' : 'var(--details)' }}>
              Evidências
            </button>
            <button onClick={() => setActiveTab('interrogations')} className={`px-4 py-2 text-lg rounded-t-lg border-b-2 transition-colors duration-200 ${activeTab === 'interrogations' ? 'font-bold' : 'font-normal'}`}
              style={{ backgroundColor: activeTab === 'interrogations' ? 'var(--main-title)' : 'transparent', borderColor: activeTab === 'interrogations' ? 'var(--main-title)' : 'transparent', color: activeTab === 'interrogations' ? 'var(--main-text)' : 'var(--details)' }}>
              Interrogatórios
            </button>
            <button onClick={() => setActiveTab('acusacao')} className={`px-4 py-2 text-lg rounded-t-lg border-b-2 transition-colors duration-200 ${activeTab === 'acusacao' ? 'font-bold' : 'font-normal'}`}
              style={{ backgroundColor: activeTab === 'acusacao' ? 'var(--main-hover)' : 'transparent', borderColor: activeTab === 'acusacao' ? 'var(--main-hover)' : 'transparent', color: activeTab === 'acusacao' ? 'white' : 'var(--main-hover)' }}>
              Acusação
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        {renderContent()}
      </div>

      <Modal isOpen={!!selectedSuspect} onClose={() => setSelectedSuspect(null)}>
        {selectedSuspect && (
          <div className="flex flex-col items-center">
            <Image
              src={`/suspeitos/suspeito-${selectedSuspect.id}.png`}
              alt={`Foto de ${selectedSuspect.name}`}
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
            <h3 className="text-2xl font-bold mt-4" style={{ color: 'var(--main-title)' }}>{selectedSuspect.name}</h3>
          </div>
        )}
      </Modal>
    </main>
  );
}