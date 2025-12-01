"use client";

import Button from "@/components/button";
import { AppointmentCard } from "@/components/appointmentCard";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { appointmentType, animalType } from "@/components/appointmentCard";
import { useRouter } from "next/navigation";

import api from "@/services/api"; 

export interface Appointment {
  id: number; 
  idPatient: number;
  date: string;
  time: string;
  doctorName: string;
  type: appointmentType;
  description: string;
}

export default function ServicePage() {
  const [tab, setTab] = useState<"agendamento" | "historico">("agendamento");

  const [originalData, setOriginalData] = useState<Appointment[]>([]);
  const [historyAppointments, setHistoryAppointments] = useState<Appointment[]>([]);
  const [nowAppointments, setNowAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);


  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");
  const router = useRouter();


  function NormalizeString(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function ConvertToDate(strDate: string, strTime: string) {
    return new Date(`${strDate}T${strTime}:00`).getTime();
  }

  function FilterConsultation(vetor: Appointment[]) {
    const termo = NormalizeString(filterValue.trim());
    const inicio = filterStart ? new Date(filterStart + "T00:00:00").getTime() : null;
    const fim = filterEnd ? new Date(filterEnd + "T23:59:59").getTime() : null;

    return vetor.filter(card => {
      const cardMs = ConvertToDate(card.date, card.time);
      const nomeOk = termo ? NormalizeString(card.doctorName).includes(termo) : true;
      const inicioOk = inicio ? cardMs >= inicio : true;
      const fimOk = fim ? cardMs <= fim : true;
      return nomeOk && inicioOk && fimOk;
    });
  }

  function FormatDateForUI(isoDate: string) {
    const dia = isoDate.slice(8, 10);
    const mes = isoDate.slice(5, 7);
    return `${dia}/${mes}`;
  }

  useEffect(() => 
    {
    const fetchConsultations = async () => {
      try {
        const response = await api.get("/consultation");
        console.log("resposta:", response.data)
        setOriginalData(response.data);

      } catch (err) {
        console.error(err);
        alert("Erro ao carregar atendimentos do servidor.");

      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);


  useEffect(() => {
    const now = new Date().getTime();
    const history = originalData.filter(a => ConvertToDate(a.date, a.time) < now);
    const upcoming = originalData.filter(a => ConvertToDate(a.date, a.time) >= now);
    setHistoryAppointments(history);
    setNowAppointments(upcoming);
  }, [originalData]);


  useEffect(() => {
    if (!search.trim()) setFilterValue("");
  }, [search]);

  const vetorAtual = tab === "historico" ? historyAppointments : nowAppointments;
  const filtroAtivo = filterValue !== "" || filterStart !== "" || filterEnd !== "";
  const displayedAppointments = filtroAtivo ? FilterConsultation(vetorAtual) : vetorAtual;

  function HandleBack() {
    router.back();
    console.log("Voltou!");
  }

  return (
    <div className="px-40">

      <div className="flex items-center gap-3 pt-6">
        <button onClick={HandleBack} className="flex items-center">
          <ChevronLeft className="h-10 w-auto" />
        </button>
        <h1 className="text-[40px] font-bold">Atendimento</h1>
      </div>

      <div className="flex flex-col mt-4 gap-3">
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

      <div className="flex items-center mt-8 justify-between">
        <div role="tablist" className="inline-flex items-center rounded-lg bg-gray-200 p-1 h-[55px]">
          <button
            onClick={() => setTab("agendamento")}
            className={`px-6 h-[45px] rounded-lg ${tab === "agendamento" ? "bg-white shadow-sm" : "hover:opacity-80"}`}
          >
            Agendamento
          </button>
          <button
            onClick={() => setTab("historico")}
            className={`px-6 h-[45px] rounded-lg ${tab === "historico" ? "bg-white shadow-sm" : "hover:opacity-80"}`}
          >
            Histórico
          </button>
        </div>

        <div className="flex gap-3">
          <input
            type="date"
            value={filterStart}
            onChange={e => setFilterStart(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 h-[55px] w-[136px]"
          />
          <input
            type="date"
            value={filterEnd}
            onChange={e => setFilterEnd(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 h-[55px] w-[136px]"
          />
        </div>
      </div>

      <div className="mt-8 w-full h-[380px] overflow-auto">
        {loading && <p className="text-[18px]">Carregando atendimentos...</p>}

        {!loading && displayedAppointments.length === 0 && (
          <p className="text-[18px]">Nenhum registro encontrado.</p>
        )}

        {!loading && displayedAppointments.length > 0 && (
           <div className="grid grid-cols-3 gap-4 mt-4">
            {displayedAppointments.map((consulta) => (
              <AppointmentCard
                 key={consulta.id}
                 date={FormatDateForUI(consulta.date)}
                 time={consulta.time}
                 vetName={consulta.doctorName}
                 appointmentType={consulta.type}
                 idPatient={consulta.idPatient}
                 idAppointment={consulta.id}
                 className={tab === "historico" ? "bg-gray-200 opacity-90" : ""}
               />
             ))}
           </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
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
