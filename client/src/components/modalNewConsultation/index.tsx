"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../button";
import { CircleCheckBig } from "lucide-react";
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
import { useState } from "react";
import api from "@/services/api";

const inputStyle = `
  w-full px-3 py-2 rounded-md border border-input bg-background text-sm
  placeholder:text-muted-foreground focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed border-black h-[50px]
`;

const FormSchema = z.object({
  tipoConsulta: z.string().min(1, "Selecione um tipo de consulta"),
  medicoResponsavel: z.string().min(3, "Digite o nome do médico"),
  dataAtendimento: z.string().min(1, "Selecione uma data"),
  horaAtendimento: z.string().min(1, "Selecione um horário"),
  descricaoProblema: z.string().min(3, "Descreva o problema"),
});

type FormData = z.infer<typeof FormSchema>;

interface DialogDemoProps {
  patientId: number;
}

function DialogDemo({ patientId }: DialogDemoProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tipoConsulta: "",
      medicoResponsavel: "",
      dataAtendimento: "",
      horaAtendimento: "",
      descricaoProblema: "",
    }
  });

  const onSubmit = async (dados: FormData) => {
    try {
      await api.post("/consultation", {
        idPatient: patientId,
        type: dados.tipoConsulta,
        doctorName: dados.medicoResponsavel,
        date: dados.dataAtendimento,
        time: dados.horaAtendimento,
        description: dados.descricaoProblema,
      });
      console.log("Consulta cadastrada com sucesso!");
      setOpen(false);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (!state) reset();
      }}
    >
      <DialogTrigger asChild>
        <div className="w-full max-w-[624px]">
             <Button
                text="Agendamento"
                className="font-normal w-full" 
                icon={<CircleCheckBig className="!w-5 !h-5" />}
            />
        </div>
      </DialogTrigger>

      <DialogContent className="w-[95vw] md:max-w-[824px] max-h-[90vh] overflow-y-auto flex flex-col !rounded-3xl pt-[35px] pb-[30px]">

        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
         
          <div className="px-1 pb-4 flex-1">
            <DialogHeader className="w-full mb-6">
              <Image
                src={citiIcon}
                alt="Citi"
                width={189}
                height={74}
                className="object-contain mb-2 mx-auto w-[140px] md:w-[189px]"
              />
              <DialogTitle className="text-sm md:text-[16px] w-full max-w-[481px] mx-auto text-center">
                <span className="font-bold">O pet já está cadastrado no sistema! </span>
                <span className="font-normal">Preencha os dados da </span>
                <span className="font-bold">consulta</span>
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="grid gap-2">
                  <Label htmlFor="tipoConsulta">Tipo de consulta</Label>
                  <Select onValueChange={(v) => setValue("tipoConsulta", v, { shouldValidate: true })}>
                    <SelectTrigger id="tipoConsulta" className="w-full h-[50px] !border !border-black">
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
                    <span className="text-red-500 text-[11px]">{errors.tipoConsulta.message}</span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="medicoResponsavel">Médico responsável</Label>
                  <input
                    id="medicoResponsavel"
                    className={inputStyle}
                    placeholder="Digite aqui..."
                    {...register("medicoResponsavel")}
                  />
                  {errors.medicoResponsavel && (
                    <span className="text-red-500 text-[11px]">{errors.medicoResponsavel.message}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dataAtendimento">Data de atendimento</Label>
                  <input
                    id="dataAtendimento"
                    type="date"
                    className={inputStyle}
                    {...register("dataAtendimento")}
                  />
                  {errors.dataAtendimento && (
                    <span className="text-red-500 text-[11px]">{errors.dataAtendimento.message}</span>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="horaAtendimento">Horário de atendimento</Label>
                  <input
                    id="horaAtendimento"
                    type="time"
                    className={inputStyle}
                    {...register("horaAtendimento")}
                  />
                  {errors.horaAtendimento && (
                    <span className="text-red-500 text-[11px]">{errors.horaAtendimento.message}</span>
                  )}
                </div>
              </div>

              <div className="grid gap-2 mt-2">
                <Label htmlFor="descricaoProblema">Descrição do problema</Label>
                <input
                  id="descricaoProblema"
                  placeholder="Descreva o problema aqui..."
                  className={inputStyle}
                  {...register("descricaoProblema")}
                />
                {errors.descricaoProblema && (
                  <span className="text-red-500 text-[11px]">{errors.descricaoProblema.message}</span>
                )}
              </div>

            </div>
          </div>
          
          <div className="w-full flex justify-center mt-4 mb-2">
            <div className="w-full md:w-[728px]">
                <Button
                text="Finalizar cadastro"
                type="submit"
                className="font-normal w-full"
                height={42}
                />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export { DialogDemo as ModalNewConsultation };