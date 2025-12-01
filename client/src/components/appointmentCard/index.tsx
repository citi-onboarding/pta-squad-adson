import { AlarmClock, PackageIcon } from "lucide-react";
import { Animals } from "@/assets";
import Image from "next/image";
import { Button as BaseButton } from "@/components/ui/button";
import api from "@/services/api"; 
import { useEffect } from "react";

import { Appointment } from "@/app/serviceScreen/page";
import { useState } from "react";


export type appointmentType = "Primeira Consulta" | "Vacinação" | "Retorno" | "Check-up";
export type animalType = "pig" | "cow" | "horse" | "sheep" | "cat" | "dog";

const colorMap: Record<appointmentType, { cardBg: string }> = {
  'Primeira Consulta': {
    cardBg: 'bg-[#BFB5FF]'
  },
  'Vacinação': {
    cardBg: 'bg-[#AAE1FF]'
  },
  'Retorno': {
    cardBg: 'bg-[#FF6419]/60'
  },
  'Check-up': {
    cardBg: 'bg-[#9CFF95]'
  }
};

interface appointmentProps {
  idPatient: number;
  date: string;
  time: string;
  vetName: string;
  appointmentType: appointmentType;
  onClick?: () => void;
  className?: string;
  idAppointment: number;
}

interface Patient {
  id: number;
  name: string;
  tutorName: string;
  species: string;
  age: number;
  consultations: Appointment[];
}

export function AppointmentCard({ idPatient, date, time, vetName, appointmentType, onClick, className, idAppointment }: appointmentProps) {
  const colors = colorMap[appointmentType];
  const handleClick = () => {
    alert("Clicou!")
  }

  const [originalPatient, setPatient] = useState<Patient>();
  const [originalSpecies, setSpecies] = useState<animalType>("dog");
  let imagemAnimal = Animals[originalSpecies];
  

  useEffect(() => 
    {
    async function GetPatitentById(id:number) {
      const patient = await api.get(`/patient/${idPatient}`);
      return patient.data
    }

    const fetchPatient = async () => {
      try {
        const patient = await GetPatitentById(idPatient)
        console.log("resposta:", patient)
        setPatient(patient);
        setSpecies(patient.species);

      } catch (err) {
        console.error(err);
        alert("Erro ao carregar atendimentos do servidor.");
      }
    };

    fetchPatient();
  }, [idPatient]);


  return (
    <BaseButton
      onClick={handleClick}
      className={`${colors.cardBg} hover:${colors.cardBg} p-3 rounded-xl flex items-center justify-between h-[110px] ${className} text-black hover:bg-opacity-80`}
    >
      <div className="flex-shrink-0 mr-3 self-center"> 
        <div className={`bg-white/70 backdrop-blur-sm p-1 rounded-sm text-center flex flex-col items-center justify-center text-black-700 h-85`}> 
          <AlarmClock className="w-4 h-5 text-black-700" /> 
          <span className="text-[12px] font-bold leading-none mt-2">
            {date}
          </span>
          <span className="text-[12px] font-bold leading-none mt-2"> 
            {time}
          </span>
        </div>
      </div>

      <div className="flex justify-center flex-grow min-w-0 pr-2 gap-3 text-balck-700"> 
        <p className="text-[14px]  truncate leading-tight"> 
          <span className="font-bold">{originalPatient?.name}</span> / {originalPatient?.tutorName}
        </p>
        <p className="text-[14px] truncate leading-tight"> 
          {vetName}
        </p>
      </div>

      <div className="flex-shrink-0 ml-3 relative flex flex-col justify-center items-center"> 
        <div className="relative w-16 h-16"> 
          <Image src={imagemAnimal} alt="Animal image" className="w-full h-full object-contain pb-0.5" /> 
        </div>
        <div className="bg-white/70 text-[11px] font-normal text-black-400 rounded-sm w-[101px] h-[22px] flex justify-center items-center p-[4px]">
          {appointmentType}
        </div>
      </div>
    </BaseButton>
  );
}