import Image from "next/image";
import { Header } from "@/components/Header";

import { LogoCITi } from "../assets";

const placeHolderAtedimento = (
  <div className="p-8 text-center text-gray-400">
    Conteudo da Página de Atendimento
  </div>
);

const placeHolderCadastro = (
  <div className="p-8 text-center text-gray-400">
    Conteudo da Página de Cadastro
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-1 flex-col h-full bg-black p-0">
      <Header
        atendimentoContent={placeHolderAtedimento}
        cadastroContent={placeHolderCadastro}
      />
      <div className="flex flex-1 flex-col h-full justify-around items-center bg-black p-0">
        <div>
          <Image src={LogoCITi} alt="Logo citi" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold">NextJS Boilerplate</h1>
          <p className="text-white text-xl">
            Made with <strong>&lt; &#x0002F; &gt;</strong> and{" "}
            <strong>&hearts;</strong> by CITi
          </p>
        </div>
      </div>
    </div>
  );
}
