"use client"
import { Header } from "@/components/Header";


const placeHolderAtedimento = (
  <div className="p-8 text-center text-gray-400">
    Conteúdo da Página de Atendimento
  </div>
);

const placeHolderCadastro = (
  <div className="p-8 text-center text-gray-400">
    Conteúdo da Página de Cadastro
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