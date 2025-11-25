import { Request, Response } from "express";
import { Citi, Crud } from "../global";
import prisma from "../database";

class PatientController implements Crud {
  constructor(private readonly citi = new Citi("Patient")) {}
  create = async (request: Request, response: Response) => {
    const { name, tutorName,species, age } = request.body;

    const isAnyUndefined = this.citi.areValuesUndefined(
      name,
      tutorName,
      species,
      age
    );
    if (isAnyUndefined) return response.status(400).send();

    const newPatient = { name, tutorName, species, age };
    const { httpStatus, message } = await this.citi.insertIntoDatabase(newPatient);

    return response.status(httpStatus).send({ message });
  };

  get = async (request: Request, response: Response) => {

    try{
      const patients = await prisma.patient.findMany({
        include:{
          consultations: true
        }
      });
      return response.status(200).send(patients);
    } catch (error){
      return response.status(400).send([]);
    };
  
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const {name, tutorName,species, age } = request.body;

    const updatedValues = { name, tutorName,species, age };

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
      const patient = await prisma.patient.findUnique({
        where: {
          id: idnum
        },
        include: {
          consultations: true
        }
      });

      if (!patient) { 
        return response.status(404).send({ message: `Paciente com ID ${id} não encontrado.` });
      }

      return response.status(200).send(patient);
    } catch (error) {
      console.error("Erro ao buscar paciente por ID:", error); 
      return response.status(500).send({ message: "Erro interno do servidor." });
    };
};
}

export default new PatientController();
