"use client"
import Button from "@/components/button";
import { Header } from "@/components/Header";
import { AppointmentCard, appointmentType, animalType} from "@/components/appointmentCard";
import ConsultaCard from "@/components/modalNewRegistration";
import RegistrationPage from "./RegistrationPage/page";
import RegistrationForm from "@/components/registerForm";
import { ServicePage } from "./serviceScreen/page";


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
    <Header

      serviceContent={<ServicePage/>}
      registerContent={<RegistrationPage/>}

    />
  );
}