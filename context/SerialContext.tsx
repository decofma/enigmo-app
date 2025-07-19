// context/SerialContext.tsx
'use client';
import React, { createContext, useContext, useState } from 'react';

interface SerialContextType {
  serial: string | null;
  setSerial: (code: string) => void;
}

const SerialContext = createContext<SerialContextType>({
  serial: null,
  setSerial: () => {},
});

export const SerialProvider = ({ children }: { children: React.ReactNode }) => {
  const [serial, setSerial] = useState<string | null>(null);

  return (
    <SerialContext.Provider value={{ serial, setSerial }}>
      {children}
    </SerialContext.Provider>
  );
};

export const useSerial = () => useContext(SerialContext);
