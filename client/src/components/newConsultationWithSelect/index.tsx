"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../button"; 
import {CirclePlus} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import citiIcon from "@/assets/citiIcon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/services/api";

const inputStyle = `
  px-3 py-2 rounded-md border border-input bg-background text-sm
  placeholder:text-muted-foreground focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const FormSchema = z.object({
  patientId: z.string().min(1, "Selecione um paciente"),
  tipoConsulta: z.string().min(1, "Selecione um tipo de consulta"),
  medicoResponsavel: z.string().min(3, "Digite o nome do médico"),
  dataAtendimento: z.string().min(1, "Selecione uma data"),
  horaAtendimento: z.string().min(1, "Selecione um horário"),
  descricaoProblema: z.string().min(3, "Descreva o problema"),
});

type FormData = z.infer<typeof FormSchema>;

interface Patient {
  id: number;
  name: string;
  species: string;
  age: string | number; 
  ownerName: string; 
}

export function ModalNewConsultationWithSelect() {
  const [open, setOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      patientId: "",
      tipoConsulta: "",
      medicoResponsavel: "",
      dataAtendimento: "",
      horaAtendimento: "",
      descricaoProblema: "",
    }
  });

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await api.get("/patient");
        setPatients(response.data); 
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      }
    }
    fetchPatients();
  }, []);

  const onSubmit = async (dados: FormData) => {
    try {
      const response = await api.post("/consultation", {
        idPatient: Number(dados.patientId),
        type: dados.tipoConsulta,
        doctorName: dados.medicoResponsavel,
        date: dados.dataAtendimento,
        time: dados.horaAtendimento,
        description: dados.descricaoProblema,
      });

      console.log("Consulta cadastrada com sucesso!", response.data);
      setOpen(false);
      reset();
    } catch (error) {
      console.error(error);
      console.log("Erro ao cadastrar consulta.");
    }
  };

  const animals = {
    cat: "GATO",
    cow: "VACA",
    dog: "CACHORRO",
    horse: "CAVALO",
    pig: "PORCO",
    sheep: "OVELHA",
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (!state) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          text="Nova consulta"
          width={200} 
          className="font-normal mb-5"
          icon={<CirclePlus className="!w-5 !h-5" />}
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[824px] max-h-[650px] flex flex-col !rounded-3xl pt-[35px] pb-[30px]" aria-describedby={undefined}>

        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
         
          <div className="overflow-y-auto px-1 pb-4 flex-1">
            <DialogHeader className="w-full">
              <Image
                src={citiIcon}
                alt="Citi"
                width={189}
                height={74}
                className="object-contain mb-2 mx-auto"
              />
              <DialogTitle className="text-[16px] w-[481px] mx-auto text-center">
                <span className="font-bold">O pet já está cadastrado no sistema! </span>
                <span className="font-normal">Preencha os dados da </span>
                <span className="font-bold">consulta</span>
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center mt-4 gap-4">

              <div className="grid gap-2">
                  <Label htmlFor="patientId">Nome do Paciente</Label>
                  <Select onValueChange={(v) => setValue("patientId", v, { shouldValidate: true })}>
                    <SelectTrigger
                      id="patientId"
                      className="w-[728px] h-[50px] !border !border-black"
                    >
                      <SelectValue placeholder="Digite o nome do paciente aqui..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={String(patient.id)}>
                          <span className="font-bold text-black">{patient.name}</span>
                          <span className="text-muted-foreground">
                            {" "}| {animals[patient.species as keyof typeof animals]} | {patient.age} anos | {patient.ownerName}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.patientId && (
                    <span className="text-red-500 text-[11px] leading-none">
                      {errors.patientId.message}
                    </span>
                  )}
              </div>

              <div className="flex gap-[12px]">
                <div className="grid gap-2">
                  <Label htmlFor="tipoConsulta">Tipo de consulta</Label>

                  <Select onValueChange={(v) => setValue("tipoConsulta", v, { shouldValidate: true })}>
                    <SelectTrigger
                      id="tipoConsulta"
                      className="w-[358px] h-[50px] !border !border-black"
                    >
                      <SelectValue placeholder="Selecione aqui" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Primeira Consulta">Primeira consulta</SelectItem>
                      <SelectItem value="Retorno">Retorno</SelectItem>
                      <SelectItem value="Check-up">Check-up</SelectItem>
                      <SelectItem value="Vacinação">Vacinação</SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.tipoConsulta && (
                    <span className="text-red-500 text-[11px] leading-none">
                      {errors.tipoConsulta.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="medicoResponsavel">Médico responsável</Label>

                  <input
                    id="medicoResponsavel"
                    className={`w-[358px] h-[50px] border border-black ${inputStyle}`}
                    placeholder="Digite aqui..."
                    {...register("medicoResponsavel")}
                  />

                  {errors.medicoResponsavel && (
                    <span className="text-red-500 text-[11px] leading-none">
                      {errors.medicoResponsavel.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-[12px]">
                <div className="grid gap-2">
                  <Label htmlFor="dataAtendimento">Data de atendimento</Label>

                  <input
                    id="dataAtendimento"
                    type="date"
                    className={`w-[358px] h-[50px] border border-black ${inputStyle}`}
                    {...register("dataAtendimento")}
                  />

                  {errors.dataAtendimento && (
                    <span className="text-red-500 text-[11px] leading-none">
                      {errors.dataAtendimento.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="horaAtendimento">Horário de atendimento</Label>

                  <input
                    id="horaAtendimento"
                    type="time"
                    className={`w-[358px] h-[50px] border border-black ${inputStyle}`}
                    {...register("horaAtendimento")}
                  />

                  {errors.horaAtendimento && (
                    <span className="text-red-500 text-[11px] leading-none">
                      {errors.horaAtendimento.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-2 mt-4">
                <Label htmlFor="descricaoProblema">Descrição do problema</Label>

                <input
                  id="descricaoProblema"
                  placeholder="Descreva o problema aqui..."
                  className={`w-[728px] h-[50px] border border-black ${inputStyle}`}
                  {...register("descricaoProblema")}
                />

                {errors.descricaoProblema && (
                  <span className="text-red-500 text-[11px] leading-none">
                    {errors.descricaoProblema.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-4 mb-2">
            <Button
              text="Finalizar cadastro"
              type="submit"
              width={728}
              height={42}
              className="font-normal"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}