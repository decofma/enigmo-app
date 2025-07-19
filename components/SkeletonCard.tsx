// components/SkeletonCard.tsx
"use client";

export default function SkeletonCard() {
  return (
    <div className="p-4 rounded-lg flex flex-col items-center text-center animate-pulse" style={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--details)' }}>
      {/* Esqueleto da Imagem */}
      <div className="w-[120px] h-[120px] bg-gray-700 rounded-full mb-4"></div>
      
      {/* Esqueleto do Título */}
      <div className="h-6 w-3/4 bg-gray-700 rounded-md mb-4"></div>
      
      <div className="text-left w-full mt-4 space-y-2">
        {/* Esqueleto do Texto */}
        <div className="h-4 w-full bg-gray-700 rounded-md"></div>
        <div className="h-4 w-5/6 bg-gray-700 rounded-md"></div>
        <div className="h-4 w-full bg-gray-700 rounded-md"></div>
        <div className="h-4 w-4/6 bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
}