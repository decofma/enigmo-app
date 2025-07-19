// app/dashboard/page.tsx
import GameCard from "../../components/GameCard";
import Image from 'next/image';
import Link from 'next/link'; // Importe o Link
import logo from "../../public/Enigmo.png";

export default function Dashboard() {
  return (
    <main className="min-h-screen px-4 py-10 flex items-center flex-col">
      <div className="absolute top-0 right-0 m-4">
        <Image src={logo} alt="Logo Enigmo" width={50} height={50} style={{ borderRadius: "50%" , filter: "brightness(0) invert(1)"}}/>
      </div>
      <h1 className="text-3xl font-bold mb-8">Investigações Disponíveis:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/game/mansao-montes">
          <GameCard
            title="O Enigma da Mansão Montês"
            description="Um assassinato misterioso em uma noite chuvosa. Descubra o culpado."
          />
        </Link>
      </div>
    </main>
  );
}