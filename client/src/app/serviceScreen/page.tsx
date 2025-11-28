"use client";


import Button from "@/components/button";
import { AppointmentCard } from "@/components/appointmentCard";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Chevron from "@/assets/chevron.svg";
import { useEffect, useState } from "react";
import { appointmentType, animalType } from "@/components/appointmentCard";
import { useRouter } from "next/navigation";


interface Appointment {
  date: string;
  time: string;
  petName: string;
  ownerName: string;
  vetName: string;
  animalType: animalType;
  appointmentType: appointmentType;
}


export function ServicePage() {
  const [tab, setTab] = useState<"agendamento" | "historico">("agendamento");

  const [appointments] = useState<Appointment[]>([
    { date: "2025-11-12", time: "09:30", petName: "Billy", ownerName: "Luiz Philip", vetName: "Dr. Augusto", animalType: "dog", appointmentType: "Vacinação" },
    { date: "2025-11-14", time: "15:00", petName: "Mia", ownerName: "Carla Souza", vetName: "Dra. Ana", animalType: "cat", appointmentType: "Retorno" },
    { date: "2025-10-21", time: "14:20", petName: "Nina", ownerName: "Julia Andrade", vetName: "Dra. Clara", animalType: "sheep", appointmentType: "Vacinação" },
    { date: "2025-12-03", time: "10:30", petName: "Zeus", ownerName: "Carlos Henrique", vetName: "Dr. Felipe", animalType: "dog", appointmentType: "Primeira Consulta" },
    { date: "2025-12-07", time: "14:00", petName: "Lola", ownerName: "Amanda Silva", vetName: "Dra. Ana", animalType: "cat", appointmentType: "Check-up" },
    { date: "2025-12-12", time: "09:00", petName: "Thor", ownerName: "Renato Costa", vetName: "Dr. Augusto", animalType: "horse", appointmentType: "Vacinação" },
    { date: "2025-12-15", time: "08:10", petName: "Bolt", ownerName: "Marcos", vetName: "Dr. Augusto", animalType: "dog", appointmentType: "Check-up" },
    { date: "2025-12-28", time: "18:30", petName: "Mel", ownerName: "Bianca", vetName: "DR. AUGUSTO", animalType: "dog", appointmentType: "Retorno" },
    { date: "2025-11-29", time: "07:00", petName: "Sol", ownerName: "Pedro", vetName: "Dr. Augusto", animalType: "cat", appointmentType: "Vacinação" }
  ]);

  const [historyAppointments] = useState<Appointment[]>([
    { date: "2025-02-18", time: "13:00", petName: "Luna", ownerName: "João Alves", vetName: "Dr. José Carlos", animalType: "cat", appointmentType: "Primeira Consulta" },
    { date: "2025-01-05", time: "10:15", petName: "Rex", ownerName: "Mariana Lima", vetName: "Dr. Paulo", animalType: "dog", appointmentType: "Check-up" }
  ]);

  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");

  function NormalizeString(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function ConvertToDate(strDate: string, strTime: string) {
    if (strDate.includes("-")) {
      const partes = strDate.split("-");
      if (partes.length === 3 && partes[0].length === 4) {
        return new Date(`${strDate}T${strTime}:00`);
      }
    }

    const [dia, mes] = strDate.split(/[\/-]/).map(Number);
    const anoAtual = new Date().getFullYear();
    const [hora, minuto] = strTime.split(":").map(Number);
    return new Date(anoAtual, mes - 1, dia, hora, minuto);
  }

  function FilterConsultation(vetor: Appointment[]) {
    const termo = NormalizeString(filterValue.trim());
    const inicio = filterStart ? new Date(filterStart + "T00:00:00").getTime() : null;
    const fim = filterEnd ? new Date(filterEnd + "T23:59:59").getTime() : null;

    return vetor.filter(card => {
      const cardMs = ConvertToDate(card.date, card.time).getTime();
      const nomeOk = termo ? NormalizeString(card.vetName).includes(termo) : true;
      const inicioOk = inicio !== null ? cardMs >= inicio : true;
      const fimOk = fim !== null ? cardMs <= fim : true;
      return nomeOk && inicioOk && fimOk;
    });
  }

  useEffect(() => {
    if (!search.trim()) setFilterValue("");
  }, [search]);

  const vetorAtual = tab === "historico" ? historyAppointments : appointments;
  const filtroAtivo = filterValue !== "" || filterStart !== "" || filterEnd !== "";
  const displayedAppointments = filtroAtivo ? FilterConsultation(vetorAtual) : vetorAtual;
 
  function FormatDateForUI(isoDate: string) {
    const dia = isoDate.slice(8, 10);
    const mes = isoDate.slice(5, 7);
    return dia + "/" + mes;
  }

  const router = useRouter();

  function HandleBack() {
    router.back();
    console.log("Voltou!")
  }


  return (
    <div className="service-page">


      <div className="flex items-center gap-3 pt-6 ml-[192px]">
        <button onClick={HandleBack} className="flex items-center">
            <Image src={Chevron} alt="Chevron" width={32} height={32} />
        </button>
        <h1 className="text-[30px] font-bold">Atendimento</h1>
      </div>


      <div className="flex flex-col mt-4 gap-3 ml-[198px]">
        <h3 className="text-[20px]">Qual é o médico?</h3>
        <div className="flex gap-5">
          <Input
            placeholder="Pesquise..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-10 w-[520px]"
          />
          <Button
            text="Buscar"
            bgColor="#7D1AD7"
            width={116}
            height={42}
            onClickAction={() => setFilterValue(search)}
            type="button"
          />
        </div>
      </div>


      <div className="flex items-center mt-8 ml-[198px]">
        <div role="tablist" className="inline-flex items-center rounded-lg bg-gray-200 p-1 h-[55px]">
            <button onClick={() => setTab("agendamento")} className={`px-6 h-[45px] rounded-lg ${tab === "agendamento" ? "bg-white shadow-sm" : "bg-gray-200 hover:opacity-80"}`}>
                Agendamento
            </button>
            <button onClick={() => setTab("historico")} className={`px-6 h-[45px] rounded-lg ${tab === "historico" ? "bg-white shadow-sm" : "bg-gray-200 hover:opacity-80"}`}>
                Histórico
            </button>
        </div>

        <input
          type="date"
          value={filterStart}
          onChange={e => setFilterStart(e.target.value)}
          className="ml-[755px] border border-gray-300 rounded-lg px-2 h-[55px] w-[136px]"
        />

        <input
          type="date"
          value={filterEnd}
          onChange={e => setFilterEnd(e.target.value)}
          className="ml-[15px] border border-gray-300 rounded-lg px-2 h-[55px] w-[136px]"
        />
      </div>


      <div className="mt-8 ml-[198px] w-[1310px] h-[380px] overflow-auto">
        {displayedAppointments.length === 0 && (
          <p className="text-[18px] text-black">Nenhum registro encontrado.</p>
        )}


        {displayedAppointments.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {displayedAppointments.map((consulta, i) => (
              <AppointmentCard
                key={i}
                date={FormatDateForUI(consulta.date)}
                time={consulta.time}
                petName={consulta.petName}
                ownerName={consulta.ownerName}
                vetName={consulta.vetName}
                animalType={consulta.animalType}
                appointmentType={consulta.appointmentType}
                className={tab === "historico" ? "bg-gray-200 opacity-90 pointer-events-none" : ""}
              />
            ))}
          </div>
        )}
      </div>


      <div className="mt-8 ml-[1303px]">
        <Button
          text="Nova Consulta"
          bgColor="#50E678"
          width={205}
          height={48}
          onClickAction={() => console.log("Nova consulta!")}
          type="button"
        />
      </div>
    </div>
  );
}
