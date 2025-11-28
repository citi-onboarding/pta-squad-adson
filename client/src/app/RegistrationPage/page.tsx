"use client";

import { useRouter } from "next/navigation";
import RegistrationForm from "@/components/registerForm";
import { Header } from "@/components/Header";

export default function RegistrationPage() {
  const router = useRouter();

  const serviceContent = (
    <div className="p-6">
    </div>
  );

  const registerContent = (
    <div className="min-h-screen bg-white p-6">
      <div className="flex items-center justify-start ml-32">
        <div className="flex items-center gap-1 w-[279px] h-[53px]">
          <button 
            onClick={() => router.back()}
            className="flex items-center justify-center hover:bg-gray-100 transition-colors p-2"
            aria-label="Voltar"
          >
            <svg 
              width="53" 
              height="53" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          
          <h1 
            className="text-[53px] font-bold text-black leading-none"
            style={{
              fontFamily: 'SF Pro Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Cadastro
          </h1>
        </div>
      </div>

      
      <div className="mt-3">
        <RegistrationForm />
      </div>
    </div>
  );

  return (
    <Header 
      serviceContent={serviceContent} 
      registerContent={registerContent} 
    />
  );
}