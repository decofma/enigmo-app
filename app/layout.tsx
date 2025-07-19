// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from '../context/AuthContext'; 
import { SerialProvider } from "../context/SerialContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enigmo",
  description: "Enigmo App",

  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${inter.className} bg-black text-white`}>
        <AuthProvider> 
          <SerialProvider>{children}</SerialProvider>
        </AuthProvider>
      </body>
    </html>
  );
}