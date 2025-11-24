"use client"
import { Header } from "@/components/Header";
import { AppointmentCard, appointmentType, animalType} from "@/components/appointmentCard";


const placeHolderAtedimento = (
  <div className="p-8 text-center text-gray-400">
    Conteúdo da Página de Atendimento
  </div>
);

const placeHolderCadastro = (
  <div className="p-8 text-center text-gray-400">
    Conteúdo da Página de Cadastro
  </div>
);

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
    animalType: 'cat',
    appointmentType: 'Primeira Consulta',
  },
  {
    id: 2,
    date: '18/02',
    time: '13:00',
    petName: 'Luna',
    ownerName: 'João Alves',
    vetName: 'Dr. José Carlos',
    animalType: 'horse',
    appointmentType: 'Retorno',
  },
  {
    id: 3,
    date: '18/02',
    time: '13:00',
    petName: 'Luna',
    ownerName: 'João Alves',
    vetName: 'Dr. José Carlos',
    animalType: 'cow',
    appointmentType: 'Check-up',
  },
  {
    id: 4,
    date: '18/02',
    time: '13:00',
    petName: 'Luna',
    ownerName: 'João Alves',
    vetName: 'Dr. José Carlos',
    animalType: 'sheep',
    appointmentType: 'Vacinação',
  },
  {
    id: 5,
    date: '18/02',
    time: '13:00',
    petName: 'Luna',
    ownerName: 'João Alves',
    vetName: 'Dr. José Carlos',
    animalType: 'dog',
    appointmentType: 'Vacinação',
  },
  {
    id: 6,
    date: '18/02',
    time: '13:00',
    petName: 'Luna',
    ownerName: 'João Alves',
    vetName: 'Dr. José Carlos',
    animalType: 'pig',
    appointmentType: 'Vacinação',
  },
]

export default function Home() {
  return (
    <div>
      <Header
        serviceContent={placeHolderAtedimento}
        registerContent={placeHolderCadastro}
    />
      
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-extrabold text-gray-900 - mb-8">
          Consultas
        </h1>
        <div className="grid grid-cols-3 gap-6 justify-items-center">
          {mockAppointments.map((appointment)=>(
            <AppointmentCard 
              key={appointment.id} 
              {...appointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
