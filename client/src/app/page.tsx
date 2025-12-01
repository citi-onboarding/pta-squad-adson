"use client"

import { Header } from "@/components/Header";
import ConsultaCard from "@/components/modalNewRegistration";
import RegistrationPage from "./RegistrationPage/page";
import RegistrationForm from "@/components/registerForm";
import ServicePage from "./serviceScreen/page";


  
 
export default function Home() {
  return (
    <Header

      serviceContent={<ServicePage/>}
      registerContent={<RegistrationPage/>}

    />
  );
}