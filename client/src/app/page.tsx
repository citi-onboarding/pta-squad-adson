"use client"
import Button from "@/components/button";
import { Header } from "@/components/Header";
import ConsultaCard from "@/components/modalNewRegistration";
import RegistrationForm from "@/components/registerForm";


const placeHolderAtedimento = (
  <div className="p-8 text-center text-gray-400 items-center flex flex-col gap-10">
    <ConsultaCard/>
    <Button text="Novo Botão" onClickAction={() => alert("Botão Funcionando!")} />
  </div>
);

const placeHolderCadastro = (
  <div className="p-8 text-center text-gray-400">
    <RegistrationForm/>
  </div>
);

export default function Home() {
  return (
      <Header
        serviceContent={placeHolderAtedimento}
        registerContent={placeHolderCadastro}
      />
     
  );
}