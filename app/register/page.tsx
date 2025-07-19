// app/register/page.tsx
"use client";
import RegisterForm from "../../components/RegisterForm";
import { useEffect } from "react";
import { useSerial } from "../../context/SerialContext";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import logo from "../../public/Enigmo.png";
export default function RegisterPage() {
  const { serial } = useSerial();
  const router = useRouter();

  useEffect(() => {
    if (!serial) {
      router.push("/serial");
    }
  }, [serial, router]);

  if (!serial) return null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute top-0 right-0 m-4">
        <Image src={logo} alt="Logo Enigmo" width={50} height={50} style={{ borderRadius: "50%" , filter: "brightness(0) invert(1)"}}/>
      </div>
      <RegisterForm />
    </div>
  );
}
