import { AlarmClock } from "lucide-react";
import { Animals } from "@/assets";
import Image from "next/image";
import { Button as BaseButton } from "@/components/ui/button";

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

export function AppointmentCard({ date, time, petName, ownerName, vetName, animalType, appointmentType, onClick, className }: appointmentProps) {
  const colors = colorMap[appointmentType];
  let imagemAnimal = Animals[animalType];
  const handleClick = () => {
    alert("Clicou!")
  }

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
          <span className="font-bold">{petName}</span> / {ownerName}
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