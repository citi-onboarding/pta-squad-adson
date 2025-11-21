import {AlarmClock} from "lucide-react";
import { Animals } from "@/assets";
import Image from "next/image";


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
    cardBg: 'bg-[#FFA35D]'
  },
  'Check-up': {
    cardBg: 'bg-[#9CFF95]'
  }
};

interface appointmentProps {
    date: string;
    time: string;
    petName: string;
    ownerName: string;
    vetName: string;
    animalType: animalType
    appointmentType: appointmentType
}


export function AppointmentCard({date,time,petName,ownerName,vetName,animalType,appointmentType}:appointmentProps){

    const colors = colorMap[appointmentType];
    let imagemAnimal = Animals[animalType];


    return(
        <div className={`${colors.cardBg} p-5 rounded-xl shadow-lg flex items-center justify-between w-full max-w-lg`}>
            <div className="mr-3 flex-shrink-0">
                <div className={`
                    bg-white/70 backdrop-blur-sm p-2 rounded-lg text-center
                    flex flex-col items-center justify-center w-16 h-24
                    `}>
                    
                    <AlarmClock className="w-5 h-5 mb-1 text-gray-700"/>
                    <span className="text-lg font-bold text-gray-800 leading-none">
                        {date}
                    </span>
                    <span className="text-md font-semibold text-gray-700 leading-nome - mt-1">
                        {time}
                    </span>

                </div>
            </div>

            <div className="flex justify-center flex-grow min-w-0 pr-4">
                <p className="text-[13px] font-bold text-gray-800 mt-1">
                    {petName} / {ownerName}
                </p>
                <p className="text-sm text-gray-600 truncate ml-5 mt-1">
                    {vetName}
                </p>

            </div>

            <div className="flex-shrink-0 ml-auto relative">
                <div className="relative w-24 h-24">
                    <Image src={imagemAnimal} alt = "Imagem Animal" className="w-full h-full object-contain pb-6" />
                </div>
                <div className= "bg-white/70 text-xs font-semibold text-gray-700 rounded-sm px-5 py-1 absolute -bottom-2 right-0 whitespace-nowrap shadow-sm">
                    {appointmentType}
                </div>
            </div>
        </div>
    );
};