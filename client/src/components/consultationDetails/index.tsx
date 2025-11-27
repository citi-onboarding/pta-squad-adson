"use client";

import Image from "next/image";
import catImg from "@/assets/cat.svg";

interface ConsultationData {
  pageTitle: string;
  patient: {
    name: string;
    age: string;
    image: any;
    imageAlt: string;
  };
  tutor: {
    name: string;
  };
  veterinarian: {
    name: string;
  };
  problemSection: {
    title: string;
  };
  consultation: {
    description: string;
    typeLabel: string;
    type: "Primeira Consulta" | "Vacinação" | "Retorno" | "Check-up";
  };
}

interface ConsultationDetailsProps {
  consultationData?: ConsultationData;
  consultationsData?: ConsultationData[];
}

export default function ConsultationDetails({
  consultationData: propConsultationData,
  consultationsData: propConsultationsData,
}: ConsultationDetailsProps) {
  const defaultConsultationsData: ConsultationData[] = [
    {
      pageTitle: "Paciente",
      patient: {
        name: "Luna",
        age: "5 anos",
        image: catImg,
        imageAlt: "Paciente",
      },
      tutor: {
        name: "Lucas Gomes",
      },
      veterinarian: {
        name: "Dr. José Carlos",
      },
      problemSection: {
        title: "Descrição do problema:",
      },
      consultation: {
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
        typeLabel: "Tipo de consulta:",
        type: "Primeira Consulta",
      },
    },
  ];

  const consultationData =
    propConsultationData ||
    (propConsultationsData && propConsultationsData[0]) ||
    defaultConsultationsData[0];

  const typeColors: Record<string, string> = {
    "Primeira Consulta": "bg-[#BFB5FF]",
    "Vacinação": "bg-[#AAE1FF]",
    "Retorno": "bg-[#FF6419]/60",
    "Check-up": "bg-[#9CFF95]",
  };

  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-black text-left">
        {consultationData.pageTitle}
      </h2>
      <div className="flex gap-6">
        <Image
          src={consultationData.patient.image}
          alt={consultationData.patient.imageAlt}
          width={295}
          height={299}
          className="w-[295px] h-[299px] object-cover"
        />

        <div className="flex flex-col justify-between h-[299px]">
          <div className="mt-14">
            <h3 className="text-2xl font-bold text-black">
              {consultationData.patient.name}
            </h3>

            <p className="font-normal mt-2 text-[24px] leading-[110%] tracking-[0] text-black">
              {consultationData.patient.age}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-black text-[16px] leading-[110%] tracking-[0] font-normal">
              {consultationData.tutor.name}
            </p>

            <p className="mt-3 text-black text-[16px] leading-[110%] tracking-[0] font-normal">
              {consultationData.veterinarian.name}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-1 flex  text-left text-black">
          {consultationData.problemSection.title}
        </h3>
        <p className="text-black text-sm leading-relaxed text-left">
          {consultationData.consultation.description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-5">
        <h3 className="font-bold text-black">
          {consultationData.consultation.typeLabel}
        </h3>

        <span
          className={`px-4 py-1 rounded-md text-black  ${typeColors[consultationData.consultation.type]}`}
        >
          {consultationData.consultation.type}
        </span>
      </div>
    </div>
  );
}


