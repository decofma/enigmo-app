"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("session", "true");
      router.push("/dashboard");
    } else {
      alert(data.error || "Erro ao logar");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm space-y-4 p-6 bg-gray-900 rounded-lg"
    >
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        className="w-full p-2 rounded bg-gray-800 text-white"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full p-2 rounded bg-gray-800 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-500 rounded p-2 font-semibold"
      >
        Entrar
      </button>
    </form>
  );
}
