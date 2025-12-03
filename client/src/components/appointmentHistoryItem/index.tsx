"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter} from "next/navigation";

interface AppointmentHistoryItemProps {
  id: number;
  date: string;    
  hour: string;    
  type: string;    
  doctor: string;  
}

export function AppointmentHistoryItem({ id, date, hour, type, doctor }: AppointmentHistoryItemProps) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-between bg-[#F0F0F0] hover:opacity-90 transition"
      style={{
        width: '510px',
        height: '82px',
        borderRadius: '16px',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #E5E7EB'
      }}
      onClick={()=>{
        router.push(`/consultation/${id}`)
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
        <span className="font-bold text-sm leading-tight text-black">{date}</span>
        <span className="font-bold text-sm leading-tight text-black">{hour}</span>
      </div>

      
      <div className="flex-1 text-center">
        <span className="font-bold text-sm text-black">
          {type}
        </span>
      </div>

      
      <div className="flex items-center gap-12">
        <span className="font-normal text-sm text-black">
          {doctor}
        </span>
        <ArrowRight className="text-black w-6 h-6" />
      </div>
    </Button>
  );
}
