"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/button";

import sheepImg from "@/assets/sheep.svg";
import catImg from "@/assets/cat.svg";
import pigImg from "@/assets/pig.svg";
import cowImg from "@/assets/cow.svg";
import horseImg from "@/assets/horse.svg";
import dogImg from "@/assets/dog.png";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


const patientSchema = z.object({
  patientName: z.string().min(1, "Este campo é obrigatório"),
  tutorName: z.string().min(1, "Este campo é obrigatório"),
  species: z.string().min(1, "Este campo é obrigatório"),
  age: z.string().min(1, "Este campo é obrigatório"),
});


const consultSchema = z.object({
  consultType: z.string().min(1, "Este campo é obrigatório"),
  doctor: z.string().min(1, "Este campo é obrigatório"),
  date: z.string().min(1, "Este campo é obrigatório"),
  time: z.string().min(1, "Este campo é obrigatório"),
  description: z.string().min(1, "Este campo é obrigatório"),
});


const formSchema = patientSchema.merge(consultSchema);

type FormData = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [species, setSpecies] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const watchedConsultType = watch("consultType");
  const watchedDate = watch("date");

  function getTodayISO() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function getNowHHMM() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  const todayISO = getTodayISO();
  const nowHHMM = getNowHHMM();

  const onSubmit = (data: FormData) => {

    const patientData ={
      patientName : data.patientName,
      tutorName : data.tutorName,
      species: data.species,
      age : data.age,
    };

    const consultData = {
      consultType : data.consultType,
      doctor : data.doctor,
      date : data.date,
      time : data.time,
      description : data.description,
    };

    console.log("Paciente:",patientData);
    console.log("Consulta:",consultData);
    
    setSubmitResult({ 
      ok: true, 
      patient : patientData,
      consult : consultData
    });
  };

  const animals = [
    { key: "sheep", src: sheepImg, alt: "Ovelha" },
    { key: "cat", src: catImg, alt: "Gato" },
    { key: "pig", src: pigImg, alt: "Porco" },
    { key: "cow", src: cowImg, alt: "Vaca" },
    { key: "horse", src: horseImg, alt: "Cavalo" },
    { key: "dog", src: dogImg, alt: "Cachorro" },
  ];

  const consultTypes = [
    "Primeira Consulta",
    "Vacinação",
    "Retorno",
    "Check-up"
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-[1532px]  mx-auto bg-white p-6 rounded-xl "
    >
      {/* Nome Paciente + Nome Tutor */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-[16px] font-bold leading-[110%] tracking-[0px] mb-2 block"
            style={{
              fontFamily:
                'SF Pro Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Nome do Paciente
          </label>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Input
                {...register("patientName")}
                placeholder="Digite aqui..."
                onChange={(e) => {
                  const filtered = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                  setValue("patientName", filtered);
                }}
                className={`w-[754px] h-[50px] rounded-[8px] border px-4 py-0 box-border ${
                  errors.patientName ? "border-red-500" : "border-[#101010]"
                }`}
              />
            </div>
            {errors.patientName && (
              <span className="text-red-500 text-sm">{errors.patientName.message}</span>
            )}
          </div>
        </div>

        <div>
          <label
            className="text-[16px] font-bold leading-[110%] tracking-[0px] mb-2 block"
            style={{
              fontFamily:
                'SF Pro Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Nome do Tutor
          </label>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Input
                {...register("tutorName")}
                placeholder="Digite aqui..."
                onChange={(e) => {
                  const filtered = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                  setValue("tutorName", filtered);
                }}
                className={`w-[754px] h-[50px] rounded-[8px] border px-4 box-border ${
                  errors.tutorName ? "border-red-500" : "border-[#101010]"
                }`}
              />
            </div>
            {errors.tutorName && (
              <span className="text-red-500 text-sm">{errors.tutorName.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Seleção de Espécie */}
      <div>
        <label
          className="text-[16px] font-bold leading-[110%] tracking-[0px] mb-3 block"
          style={{
            fontFamily:
              'SF Pro Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
        >
          Qual é a espécie do paciente?
        </label>

        <div className=" flex 
    items-center
    justify-start
    w-[1042.37px]
    h-auto
    p-3
    gap-[60px]
    bg-transparent
  ">
          {animals.map((animal) => {
            const isActive = species === animal.key;

            return (
              <button
                key={animal.key}
                type="button"
                onClick={() => {
                  setSpecies(animal.key);
                  setValue("species", animal.key);
                }}
                aria-pressed={isActive}
                className={`p-[10px] rounded-lg transition select-none focus:outline-none ${
                  isActive ? "bg-[#D9D9D9]" : "hover:bg-gray-50"
                }`}
              >
                <Image
                  src={animal.src}
                  alt={animal.alt}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </button>
            );
          })}
        </div>
        <input
          {...register("species")}
          type="hidden"
          value={species || ""}
        />
        {errors.species && (
          <span className="text-red-500 text-sm block mt-1">{errors.species.message}</span>
        )}
      </div>

      {/* Idade + Tipo de Consulta (mesma linha) */}
      <div className="grid grid-cols-2 gap-4"> 
        <div>
          <label
            className="text-[16px] font-bold leading-[110%] tracking-[0px] mb-2 block"
            style={{
              fontFamily:
                'SF Pro Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Idade do Paciente
          </label>
          <div className="flex flex-col gap-1">
            <div className="flex">
              <Input
                {...register("age")}
                placeholder="Digite aqui..."
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "");
                  setValue("age", digits);
                }}
                inputMode="numeric"
                pattern="\d*"
                className={`w-[754px] h-[50px] rounded-[8px] border px-4 box-border ${
                  errors.age ? "border-red-500" : "border-[#101010]"
                }`}
              />
            </div>
            {errors.age && (
              <span className="text-red-500 text-sm">{errors.age.message}</span>
            )}
          </div>
        </div>

        <div>
          <label
            className="text-[16px] font-bold leading-[110%] tracking-[0px] mb-2 block"
            style={{
              fontFamily:
                'SF Pro Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Tipo da consulta
          </label>

          <div className="flex flex-col gap-1">
            <Select
              value={watchedConsultType || ""}
              onValueChange={(value) => {
                setValue("consultType", value);
              }}
            >
              <SelectTrigger className={`w-[735px] h-[50px] rounded-[8px] border px-4 box-border ${
                errors.consultType ? "border-red-500" : "border-[#101010]"
              }`}>
                <SelectValue placeholder="Selecione aqui" />
              </SelectTrigger>

              <SelectContent>
                {consultTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              {...register("consultType")}
              type="hidden"
              value={watchedConsultType || ""}
            />
            {errors.consultType && (
              <span className="text-red-500 text-sm">{errors.consultType.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Médico Responsável / Data / Horário (mesma linha) */}
      <div className="flex items-start gap-6">
        <div className="flex flex-col">
          <label
            className="text-[16px] font-bold leading-[110%] tracking-[0px] mb-2 block"
            style={{
              fontFamily:
                'SF Pro Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Médico Responsável
          </label>
          <div className="flex flex-col gap-1">
            <Input
              {...register("doctor")}
              placeholder="Digite aqui..."
              onChange={(e) => {
                const filtered = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                setValue("doctor", filtered);
              }}
              className={`w-[696px] h-[50px] rounded-[8px] border px-4 box-border ${
                errors.doctor ? "border-red-500" : "border-[#101010]"
              }`}
            />
            {errors.doctor && (
              <span className="text-red-500 text-sm">{errors.doctor.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label
            className="text-[16px] font-bold leading-[110%] tracking-[0px] mb-2 block"
            style={{
              fontFamily:
                'SF Pro Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Data do atendimento
          </label>
          <div className="flex flex-col gap-1">
            <input
              {...register("date")}
              type="date"
              min={todayISO}
              className={`w-[390px] h-[50px] rounded-[8px] border px-4 box-border ${
                errors.date ? "border-red-500" : "border-[#101010]"
              }`}
            />
            {errors.date && (
              <span className="text-red-500 text-sm">{errors.date.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label
            className="text-[16px] font-bold leading-[110%] tracking-[0px] mb-2 block"
            style={{
              fontFamily:
                'SF Pro Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            }}
          >
            Horário do atendimento
          </label>
          <div className="flex flex-col gap-1">
            <input
              {...register("time")}
              type="time"
              min={watchedDate === todayISO ? nowHHMM : undefined}
              className={`w-[350px] h-[50px] rounded-[8px] border px-4 box-border ${
                errors.time ? "border-red-500" : "border-[#101010]"
              }`}
            />
            {errors.time && (
              <span className="text-red-500 text-sm">{errors.time.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div className="flex flex-col gap-4">
        <label
          className="text-[16px] font-bold leading-[110%] tracking-[0px] block"
          style={{
            fontFamily:
              'SF Pro Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          }}
        >
          Descrição do Problema
        </label>
        <div className="flex flex-col gap-1">
          <textarea
            {...register("description")}
            placeholder="Digite aqui..."
            className={`w-[1485px] h-[104px] border rounded-[8px] p-4 box-border resize-none ${
              errors.description ? "border-red-500" : "border-[#101010]"
            }`}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>
      </div>

      {/* botão de envio */}
      <div className="flex justify-end mt-8">
        <Button
          type="submit"
          text="Finalizar Cadastro"
          width={205}
        />
      </div>
    </form>
  );
}