// components/RegisterForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSerial } from "../context/SerialContext";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const { serial } = useSerial();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serial) {
      alert("Serial não encontrado.");
      return;
    }
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password: senha, // aqui usa password para enviar à API
        serial,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("session", "true");
      router.push("/dashboard");
    } else {
      alert(data.error || "Erro ao registrar");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 p-6 bg-gray-900 rounded-lg"
    >
      <h2 className="text-2xl font-bold">Criar Conta</h2>
      <input
        type="text"
        placeholder="Usuário"
        className="w-full p-2 rounded bg-gray-800 text-white"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 rounded bg-gray-800 text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full p-2 rounded bg-gray-800 text-white"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <p className="text-sm text-gray-400">
        Serial usado: <strong>{serial}</strong>
      </p>
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-500 rounded p-2 font-semibold"
      >
        Registrar
      </button>
    </form>
  );
}
