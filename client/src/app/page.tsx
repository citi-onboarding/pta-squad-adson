import Image from "next/image";
import { AppointmentCard, appointmentType, animalType} from "@/components/appointmentCard";

import { LogoCITi } from "../assets";

interface appointmentData{
  id:number;
  date:string;
  time: string;
  petName: string;
  ownerName: string;
  vetName:  string;
  animalType: animalType;
  appointmentType: appointmentType
}


const mockAppointments: appointmentData[] = [
  {
    id: 1,
    date: '18/02',
    time: '13:00',
    petName: 'Luna',
    ownerName: 'João Alves',
    vetName: 'Dr. José Carlos',
    animalType: 'dog',
    appointmentType: 'Primeira Consulta',
  },
  {
    id: 2,
    date: '19/02',
    time: '10:30',
    petName: 'Rex',
    ownerName: 'Maria Silva',
    vetName: 'Dra. Ana Paula',
    animalType: 'cat',
    appointmentType: 'Vacinação',
  },
  {
    id: 3,
    date: '20/02',
    time: '16:45',
    petName: 'Chopper',
    ownerName: 'Pedro Costa',
    vetName: 'Dr. Ricardo Borges',
    animalType: 'horse',
    appointmentType: 'Retorno',
  },
]

export default function Home() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 - mb-8">
        Consultas
      </h1>
      <div className=" flex justify-around">
        {mockAppointments.map((appointment)=>(
          <AppointmentCard key={appointment.id}{...appointment}/>
        ))}
      
      </div>
    </div>
  );
}
