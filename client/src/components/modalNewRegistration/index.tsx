import { ModalNewConsultation } from "../modalNewConsultation";


interface consultaCardProps{
  patientId:number

}

export default function ConsultaCard({patientId}:consultaCardProps) {
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="bg-white shadow-md rounded-3xl p-6 w-[680px] flex flex-col items-center border border-gray-300">
       
        <h2 className="text-lg font-bold mb-6 text-center text-black ">
          Deseja realizar outra consulta?
        </h2>

        <ModalNewConsultation patientId={0} />

      </div>
    </div>
  );
}
