import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AppointmentHistoryItemProps {
  date: string;    
  hour: string;    
  type: string;    
  doctor: string;  
}

export function AppointmentHistoryItem({ date, hour, type, doctor }: AppointmentHistoryItemProps) {
  const typeColors: Record<string, string> = {
    "Primeira Consulta": "bg-[#BFB5FF]",
    "Vacinação": "bg-[#AAE1FF]",
    "Retorno": "bg-[#FF6419]/60",
    "Check-up": "bg-[#9CFF95]",
  };

  const bgColor = typeColors[type] || "bg-[#F5F5F5]";

  return (
    <Button
      variant="ghost"
      className={`
        w-full h-[82px] flex items-center justify-between
        rounded-2xl border border-gray-200 
        py-4 px-6 ${bgColor}
        hover:opacity-90 transition
      `}
      style={{
        borderRadius: '16px',
        padding: '16px 24px',
        height: '82px',
        width: '100%',
        maxWidth: '510px'
      }}
    >
     
      <div 
        className="flex flex-col text-left bg-white rounded-lg justify-center items-center"
        style={{
          width: '51px',
          height: '50px',
          minWidth: '51px',
          minHeight: '50px'
        }}
      >
        <span className="font-bold text-sm leading-tight">{date}</span>
        <span className="font-bold text-sm leading-tight">{hour}</span>
      </div>

      
      <div className="flex-1 text-center ">
        <span 
          className="font-bold text-lg"
          style={{
            width: '114px',
            height: '15px',
            display: 'inline-block',
            lineHeight: '15px'
          }}
        >
          {type}
        </span>
      </div>

      
      <div className="flex items-center gap-12">
        <span 
          className="font-normal text-base"
          style={{
            width: '88px',
            height: '15px',
            display: 'inline-block',
            lineHeight: '15px'
          }}
        >
          {doctor}
        </span>
        <ArrowRight className="text-black w-6 h-6" />
      </div>
    </Button>
  );
}
