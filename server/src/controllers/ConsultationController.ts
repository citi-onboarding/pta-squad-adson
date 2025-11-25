import { Request, Response } from "express";
import { Citi, Crud } from "../global";
import prisma from "../database";

class ConsultationController implements Crud {
  constructor(private readonly citi = new Citi("Consultation")) {}
  create = async (request: Request, response: Response) => {
    const { type, doctorName, date, time, description, idPatient } = request.body;

    const isAnyUndefined = this.citi.areValuesUndefined(
      type,
      doctorName, 
      date, 
      time, 
      description, 
      idPatient
    );
    if (isAnyUndefined) return response.status(400).send();
    const newConsultation = {type, doctorName, date, time, description, idPatient:Number(idPatient)};
    const { httpStatus, message } = await this.citi.insertIntoDatabase(newConsultation);

    return response.status(httpStatus).send({ message });
  };

  get = async (request: Request, response: Response) => {
    const { httpStatus, values } = await this.citi.getAll();

    return response.status(httpStatus).send(values);
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const {type, doctorName, date, time, description, idPatient} = request.body;

    const updatedValues = {type, doctorName, date, time, description, idPatient};

    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updatedValues
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };


  getById = async (request: Request, response: Response) => {

    const { id } = request.params;
    const idnum = Number(id); 


    try {
      const consultation = await prisma.consultation.findUnique({
        where: {
          id: idnum
        },
      });

      if (!consultation) { 
        return response.status(404).send({ message: `Consulta com ID ${id} não encontrada.` });
      }

      return response.status(200).send(consultation);
    } catch (error) {
      console.error("Erro ao buscar consulta por ID:", error); 
      return response.status(500).send({ message: "Erro interno do servidor." });
    };
};
}

export default new ConsultationController();
