"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

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
      onClick={() => router.push(`/consultation/${id}`)}
      className="group w-full max-w-[510px] h-auto min-h-[82px] p-3 md:p-6 rounded-[16px] 
                 flex items-center justify-between gap-3 md:gap-4
                 bg-[#F0F0F0] border border-[#E5E7EB] 
                 hover:opacity-90 hover:bg-[#E5E5E5] transition-all whitespace-normal"
    >
     
      <div 
        className="flex flex-col justify-center items-center bg-white rounded-lg shrink-0 shadow-sm"
        style={{ width: '51px', height: '50px' }}
      >
        <span className="font-bold text-sm leading-tight text-black">{date}</span>
        <span className="font-bold text-sm leading-tight text-black">{hour}</span>
      </div>
      <div className="flex flex-col md:flex-row flex-1 md:items-center md:justify-between gap-1 md:gap-4 text-left md:text-center">
        <span className="font-bold text-sm text-black md:flex-1 line-clamp-1 md:line-clamp-none">
          {type}
        </span>
        <span className="font-normal text-xs md:text-sm text-gray-600 md:text-black line-clamp-1 md:line-clamp-none">
          {doctor}
        </span>
      </div>
  
      <div className="shrink-0 pl-1">
        <ArrowRight className="text-black w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
      </div>

    </Button>
  );
}