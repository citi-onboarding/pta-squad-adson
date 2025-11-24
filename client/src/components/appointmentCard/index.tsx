import {AlarmClock} from "lucide-react";
import { Animals } from "@/assets";
import Image from "next/image";
import { Button as BaseButton } from "@/components/ui/button";



export type appointmentType = "Primeira Consulta" | "Vacinação" | "Retorno" | "Check-up";
export type animalType = "pig" | "cow" | "horse" | "sheep" | "cat" | "dog";

const colorMap: Record<appointmentType, { cardBg: string}> = {
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

    date: string;
    time: string;
    petName: string;
    ownerName: string;
    vetName: string;
    animalType: animalType;
    appointmentType: appointmentType;
    onClick?: () => void;
    className?: string;
}


export function AppointmentCard({date,time,petName,ownerName,vetName,animalType,appointmentType, onClick, className}:appointmentProps){

    const colors = colorMap[appointmentType];
    let imagemAnimal = Animals[animalType];
    const handleClick = () => {
        alert("Clicou!")
    }


    return(
        <BaseButton
            onClick= {handleClick}
            variant= {null}
            className={`${colors.cardBg} p-5 rounded-xl  flex items-center justify-between w-full 
                h-[135px] ${className}`
            }> 
            <div className="flex-shrink-0 mr-4 self-center">
                <div className={`bg-white/70 backdrop-blur-sm p-2 rounded-lg text-center
                flex flex-col items-center justify-center w-max-[495px] text-black-700
                    `}>
                    
                    <AlarmClock className="w-5 h-5 mb-1 text-black-700"/>
                    <span className="text-[14px] font-bold leading-none mt-1">
                        {date}
                    </span>
                    <span className="text-[14px] font-bold leading-none mt-1"> 
                        {time}
                    </span>

                </div>
            </div>

            <div className="flex justify-center flex-grow min-w-0 pr-4 gap-6"> 

                <p className="text-[16px] font-bold text-gray-800 truncate leading-tight">
                    {petName} / {ownerName}
                </p>
                <p className="text-[16px] text-gray-600 truncate leading-tight"> 
                    {vetName}
                </p>

            </div>

            <div className="flex-shrink-0 ml-6 relative  flex flex-col justify-center items-center">
                <div className="relative w-20 h-20">
                    <Image src={imagemAnimal} alt = "Animal image" className="w-full h-full object-contain pb-1" />
                </div>
                <div className= "bg-white/70 text-[12px] font-normal text-gray-600 rounded-sm w-[101px] h-[25px] flex justify-center items-center p-[6px]">
                    {appointmentType}
                </div>
            </div>
        </BaseButton>
        
    );
};