// app/login/page.tsx
import AuthForm from "../../components/AuthForm";
import Image from 'next/image'
import logo from "../../public/Enigmo.png";
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute top-0 right-0 m-4">
        <Image src={logo} alt="Logo Enigmo" width={50} height={50} style={{ borderRadius: "50%" , filter: "brightness(0) invert(1)"}}/>
      </div>
      <AuthForm />
    </div>
  );
}
