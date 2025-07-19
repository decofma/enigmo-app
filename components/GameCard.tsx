// components/GameCard.tsx
type Props = {
  title: string;
  description: string;
};

export default function GameCard({ title, description }: Props) {
  return (
    <div className="card" >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
