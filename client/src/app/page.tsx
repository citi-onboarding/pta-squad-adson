"use client"
import Button from "@/components/button";
import { Header } from "@/components/Header";
import { AppointmentCard, appointmentType, animalType} from "@/components/appointmentCard";
import ConsultaCard from "@/components/modalNewRegistration";
import RegistrationForm from "@/components/registerForm";


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

const placeHolderAtedimento = (
  <div className="p-8 text-center items-center flex flex-col gap-10">
    <ConsultaCard/>
    <Button text="Novo Botão" onClickAction={() => alert("Botão Funcionando!")} />
    <div className="grid grid-cols-3 gap-6 justify-items-center">
      {mockAppointments.map((appointment)=>(
        <AppointmentCard 
          key={appointment.id} 
          {...appointment}
        />
      ))}
    </div>
  </div>
);

const placeHolderCadastro = (
  <div className="p-8 text-center">
    <RegistrationForm/>
  </div>
);
  
 
export default function Home() {
  return (
    <Header
      serviceContent={placeHolderAtedimento}
      registerContent={placeHolderCadastro}
    />
  );
}