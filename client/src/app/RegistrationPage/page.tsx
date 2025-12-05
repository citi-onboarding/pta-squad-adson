"use client";

import { useRouter } from "next/navigation";
import RegistrationForm from "@/components/registerForm";
import { ChevronLeft } from "lucide-react";


export default function RegistrationPage() {
  const router = useRouter();


  return(
    
      <div className="px-8 md:px-40 h-full py-5">
        <div className="flex items-center gap-1 w-[279px] h-[53px] mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center justify-center hover:bg-gray-100 transition-colors p-2 pl-1 rounded-full"
            aria-label="Voltar"
          >
            <ChevronLeft
             className="w-auto h-10"
            />
          </button>
          
          <h1 
            className="text-[25px] md:text-[40px] font-bold"
          >
            Cadastro
          </h1>
        </div>
        <RegistrationForm />
      </div>

        
     
   
  );
}