"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react"; 
import { Animals } from "@/assets"; 

import ConsultationDetails from "@/components/consultationDetails";
import { AppointmentHistory } from "@/components/appointmentHistory";
import { ModalNewConsultation } from "@/components/modalNewConsultation";
import { Header } from "@/components/Header";
import ConsultaCard from "@/components/modalNewRegistration";
import RegistrationForm from "@/components/registerForm";
import api from "@/services/api";


const placeHolderCadastro = (
  <div className="p-8 text-center">
    <RegistrationForm/>
    <ConsultaCard/>
  </div>
);


const ConsultationDetailsPage = ()=>{
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [consultationData, setConsultationData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullData = async () => {
      try {
        if (!id) return; 
        setLoading(true);

        const consultResponse = await api.get(`/consultation/${id}`);
        const currentConsult = consultResponse.data; 

        if (!currentConsult) throw new Error("Consulta não encontrada");

        const patientResponse = await api.get(`/patient/${currentConsult.idPatient}`);
        const patientData = patientResponse.data;

        if (patientData) {
          const historyFormatted = (patientData.consultations || []).map((item: any) => ({
            date: item.date,
            type: item.type,
            hour: item.time,          
            doctor: item.doctorName,  
          }));

          setHistory(historyFormatted); 

          let imagemAnimal = Animals[patientData.species as keyof typeof Animals];

          const formattedData = {
            pageTitle: "Paciente",
            patient: {
              name: patientData.name,      
              age: `${patientData.age} anos`,
              image: imagemAnimal,                  
              imageAlt: `Foto de ${patientData.name}`,
            },
            tutor: {
              name: patientData.tutorName,    
            },
            veterinarian: {
              name: currentConsult.doctorName, 
            },
            problemSection: {
              title: "Descrição do problema:",
            },
            consultation: {
              description: currentConsult.description, 
              typeLabel: "Tipo de consulta:",
              type: currentConsult.type,              
            },
          };
          setConsultationData(formattedData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFullData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-xl font-medium text-gray-500">Carregando prontuário...</p>
      </div>
    );
  }

  if (!consultationData) {
    return (
      <div className="p-8">
        <p className="text-red-500">Erro: Não foi possível carregar os dados da consulta.</p>
        <button onClick={() => router.back()} className="mt-4 text-blue-500 underline">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className=" flex flex-col w-screen bg-white">

      <div className="flex w-screen justify-around items-start">
        
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4 mt-10 ">
            <button
              onClick={() => router.back()}
              className="group p-1 -ml-2"
            >
              <ChevronLeft size={40} strokeWidth={2.5} className="text-black" />
            </button>
        
            <h1 className="text-3xl md:text-5xl font-bold font-mono text-black">
              Detalhes da Consulta
            </h1>
          </div>
          <ConsultationDetails consultationData={consultationData} />
          
          <div className=" flex flex-col px-10   rounded-lg border-gray-300 border-2 h-40 justify-center items-center ">
            <h2 className="font-bold text-xl mb-5">
              Deseja realizar outra consulta?</h2>
            <ModalNewConsultation/>

          </div>

        </div>

        <div className="pt-20">
          <AppointmentHistory
            appointments={history}
          />
        </div>

      </div>
    </div>
  );
}

 
export default function Home() {
  return (
    <Header
      serviceContent={<ConsultationDetailsPage />}
      registerContent={placeHolderCadastro}
    />
  );
}