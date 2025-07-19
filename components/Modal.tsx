// components/Modal.tsx
"use client";

import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-center p-4"
      onClick={onClose} 
    >
      <div 
        className="relative z-50 p-6 md:p-8 rounded-lg max-w-md w-full text-center"
        style={{ backgroundColor: 'var(--main-background)', border: '1px solid var(--details)'}}
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold"
          style={{color: 'var(--main-text)'}}
          aria-label="Fechar modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}