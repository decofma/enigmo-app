// components/SerialForm.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSerial } from "../context/SerialContext";

export default function SerialForm() {
  const [code, setCode] = useState("");
  const router = useRouter();
  const { setSerial } = useSerial();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("code no handleSubmit", code);
    
    const res = await fetch("/api/serial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code }),
    });

    const data = await res.json();
    console.log("data no handleSubmit", data);

    if (res.ok) {
      setSerial(code);
      router.push("/register");
    } else {
      alert(data.error || "Erro ao validar serial");
    }
  };
  useEffect(() => {
    console.log("code no useEffect", code);
    console.log("setSerial no useEffect", setSerial);
  } , [code, setSerial]);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 p-6  rounded-lg"
    >
      <h2 className="text-2xl font-bold">Validar Serial</h2>
      <input
        type="text"
        placeholder="Insira o Código Serial"
        className="w-full p-2 rounded"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full rounded p-2 font-semibold"
      >
        Validar
      </button>
    </form>
  );
}
