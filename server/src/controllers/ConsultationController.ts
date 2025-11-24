import { Request, Response } from "express";
import { Citi, Crud } from "../global";

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
}

export default new ConsultationController();
