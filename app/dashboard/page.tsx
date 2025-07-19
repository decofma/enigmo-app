// app/dashboard/page.tsx
import GameCard from "../../components/GameCard";
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/Enigmo.png";

export default function Dashboard() {
  return (
    // MUDANÇA 1: Removido o padding lateral 'px-4' do <main>
    <main className="min-h-screen py-10 flex items-center flex-col w-full">
      <div className="absolute top-0 right-0 m-4">
        <Image src={logo} alt="Logo Enigmo" width={50} height={50} style={{ borderRadius: "50%", filter: "brightness(0) invert(1)" }}/>
      </div>
      
      {/* MUDANÇA 2: Um novo container para o conteúdo que PRECISA de padding */}
      <div className="w-full max-w-4xl px-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center" style={{ color: 'var(--main-title)' }}>Investigações</h1>
      </div>

      {/* MUDANÇA 3: A linha agora está fora do container de conteúdo e sem max-width */}
      <hr className="w-full my-8" style={{ borderColor: 'var(--details)' }} />

      {/* MUDANÇA 4: Outro container para o grid de cards, para manter o padding */}
      <div className="w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/game/mansao-montes">
            <GameCard
              title="O Enigma da Mansão Montês"
              description="Um assassinato misterioso em uma noite chuvosa. Descubra o culpado."
              imageUrl="/covers/o-enigma-da-mansao-montes.png"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}