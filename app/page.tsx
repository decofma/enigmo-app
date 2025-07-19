// app/page.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from 'next/image'
import logo from "../public/Enigmo.png";
export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
      <Image src={logo} alt="Logo Enigmo" style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.3))" }}/>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/serial")}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md transition"
        >
          Criar Conta
        </button>
      </div>
    </main>
  );
}
