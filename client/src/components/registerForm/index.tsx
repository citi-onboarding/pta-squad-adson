"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  patientName: z
    .string()
    .min(1, "Nome do paciente é obrigatório")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome do paciente deve conter apenas letras e espaços"),
  tutorName: z
    .string()
    .min(1, "Nome do tutor é obrigatório")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome do tutor deve conter apenas letras e espaços"),
  species: z.string().min(1, "Selecione uma espécie"),
  age: z.preprocess((val) => {
    if (typeof val === "string") {
      const v = val.trim();
      return v === "" ? NaN : Number(v);
    }
    return val;
  }, z.number().int().positive({ message: "Informe uma idade válida" })),
});


const consultSchema = z
  .object({
    consultType: z.string().min(1, "Selecione o tipo de consulta"),
    doctor: z
      .string()
      .min(1, "Informe o médico responsável")
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Médico responsável deve conter apenas letras e espaços"),
    date: z.string().min(1, "Selecione uma data"),
    time: z.string().min(1, "Selecione o horário"),
    description: z.string().min(1, "Descreva o problema"),
  })
  .refine((data) => {
    try {
      const now = new Date();

      const [y, m, d] = data.date.split("-").map(Number);
      if (![y, m, d].every((n) => Number.isFinite(n))) return false;
      const selectedDate = new Date(y, m - 1, d);
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (selectedDate < todayStart) return false;

      const isSameDay =
        selectedDate.getFullYear() === now.getFullYear() &&
        selectedDate.getMonth() === now.getMonth() &&
        selectedDate.getDate() === now.getDate();

      if (isSameDay) {
        const parts = data.time.split(":").map(Number);
        if (parts.length !== 2 || parts.some((n) => Number.isNaN(n))) return false;
        const [h, min] = parts;
        const selectedDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, min || 0);
        if (selectedDateTime < now) return false;
      }

      return true;
    } catch {
      return false;
    }
  }, { message: "A data/horário deve ser igual ou posterior ao horário atual" });

export default function RegistrationForm() {
  const [patientName, setPatientName] = useState("");
  const [tutorName, setTutorName] = useState("");
  const [species, setSpecies] = useState<string | null>(null);
  const [age, setAge] = useState("");
  const [consultType, setConsultType] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [submitResult, setSubmitResult] = useState<any | null>(null);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const patientData = {
      patientName,
      tutorName,
      species,
      age,
    };

   
    const consultData = {
      consultType,
      doctor,
      date,
      time,
      description,
    };

    
    try {
      
      const validatedPatient = patientSchema.parse(patientData);
      console.log("✅ Dados do paciente validados:", validatedPatient);

      
      const validatedConsult = consultSchema.parse(consultData);
      console.log("✅ Dados da consulta validados:", validatedConsult);

      setSubmitResult({ 
        ok: true, 
        patient: validatedPatient, 
        consult: validatedConsult 
      });
    } catch (err: any) {
      console.error("❌ Erros de validação:", err);
      setSubmitResult({ ok: false, error: err });
    }
  }

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
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-[1532px]  mx-auto bg-white p-6 rounded-xl shadow-md"
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
          <div className="flex items-center gap-4">
            <Input
              value={patientName}
              placeholder="Digite aqui..."
              onChange={(e) => {
                const filtered = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                setPatientName(filtered);
              }}
              className="w-[754px] h-[50px] rounded-[8px] border border-[#101010] px-4 py-0 box-border"
            />
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
          <div className="flex items-center gap-4">
            <Input
              value={tutorName}
              placeholder="Digite aqui..."
              onChange={(e) => {
                const filtered = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                setTutorName(filtered);
              }}
              className="w-[754px] h-[50px] rounded-[8px] border border-[#101010] px-4 box-border"
            />
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
          <div className="flex">
            <Input
              value={age}
              placeholder="Digite aqui..."
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                setAge(digits);
              }}
              inputMode="numeric"
              pattern="\d*"
              className="w-[754px] h-[50px] rounded-[8px] border border-[#101010] px-4 box-border"
            />
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

          <Select
            value={consultType}
            onValueChange={(value) => {
              setConsultType(value);
            }}
          >
            <SelectTrigger className="w-[735px] h-[50px] rounded-[8px] border border-[#101010] px-4 box-border">
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
          <Input
            value={doctor}
            placeholder="Digite aqui..."
            onChange={(e) => {
              const filtered = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
              setDoctor(filtered);
            }}
            className="w-[696px] h-[50px] rounded-[8px] border border-[#101010] px-4 box-border"
          />
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
          <input
            type="date"
            value={date}
            min={todayISO}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="w-[390px] h-[50px] rounded-[8px] border border-[#101010] px-4 box-border"
          />
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
          <input
            type="time"
            value={time}
            min={date === todayISO ? nowHHMM : undefined}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            className="w-[350px] h-[50px] rounded-[8px] border border-[#101010] px-4 box-border"
          />
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
        <textarea
          value={description}
          placeholder="Digite aqui..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-[1485px] h-[104px] border border-[#101010] rounded-[8px] p-4 box-border resize-none"
        />
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