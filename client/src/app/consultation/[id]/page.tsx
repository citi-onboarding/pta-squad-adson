"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react"; 
import { Animals } from "@/assets"; 

import ConsultationDetails from "@/components/consultationDetails";
import { AppointmentHistory } from "@/components/appointmentHistory";
import ConsultaCard from "@/components/modalNewRegistration";
import api from "@/services/api";

export default function ConsultationDetailsPage(){
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [consultationData, setConsultationData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [idPatient, setIdPatient] = useState<number>(0);

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
        setIdPatient(currentConsult.idPatient)

        if (patientData) {
          const historyFormatted = (patientData.consultations || []).map((item: any) => ({
            date: item.date,
            type: item.type,
            hour: item.time,          
            doctor: item.doctorName,
            id: item.id
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
    <div className="flex flex-col min-h-screen w-full bg-white pb-10">

      <div className="flex flex-col lg:flex-row w-full justify-between lg:justify-around items-center lg:items-start px-4 lg:px-0 gap-8 lg:gap-0">
        
        <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-auto max-w-2xl">
          <div className="flex items-center gap-2 lg:gap-4 mt-6 lg:mt-10">
            <button
              onClick={() => router.back()}
              className="group p-1 -ml-2"
            >
              <ChevronLeft size={32} strokeWidth={2.5} className="text-black lg:w-10 lg:h-10" />
            </button>
        
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-mono text-black">
              Detalhes da Consulta
            </h1>
          </div>

          <div className="w-full">
            <ConsultationDetails consultationData={consultationData} />
          </div>
          
          <div className="w-full flex justify-center lg:justify-start">
            <ConsultaCard patientId={idPatient}/>
          </div>
        </div>

        <div className="pt-0 lg:pt-20 w-full lg:w-auto flex justify-center lg:block">
          <AppointmentHistory
            appointments={history}
          />
        </div>

      </div>
    </div>
  );
}