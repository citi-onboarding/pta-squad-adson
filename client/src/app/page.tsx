"use client"

import { Header } from "@/components/Header";
import ConsultaCard from "@/components/modalNewRegistration";
import RegistrationForm from "@/components/registerForm";
import ServicePage from "./serviceScreen/page";

const placeHolderCadastro = (
  <div className="p-8 text-center">
    <RegistrationForm/>
    <ConsultaCard/>
  </div>
);
  
 
export default function Home() {
  return (
    <Header
      serviceContent={<ServicePage/>}
      registerContent={placeHolderCadastro}
    />
  );
}