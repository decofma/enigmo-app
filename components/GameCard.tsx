// components/GameCard.tsx
import Image from 'next/image'; // Importe o componente Image

// Adicione a nova propriedade 'imageUrl'
type Props = {
  title: string;
  description: string;
  imageUrl: string; // <-- Nova propriedade
};

export default function GameCard({ title, description, imageUrl }: Props) {
  return (
    // O card agora não tem padding interno, pois a imagem e o texto terão os seus próprios
    <div className="card h-full flex flex-col"> 
      {/* Container da Imagem */}
      <div className="relative w-full h-48"> {/* Altura fixa para a imagem */}
        <Image
          src={imageUrl}
          alt={`Capa do caso ${title}`}
          layout="fill" // Faz a imagem preencher o container
          objectFit="cover" // Garante que a imagem cubra o espaço sem distorcer
          className="rounded-t-lg" // Arredonda somente os cantos de cima
        />
      </div>

      {/* Container do Texto */}
      <div className="p-4 flex-grow">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}