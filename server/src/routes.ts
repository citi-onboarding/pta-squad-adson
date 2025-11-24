import express from "express";
import userController from "./controllers/UserController";
import PatientController from "./controllers/PatientController";
import ConsultationController from "./controllers/ConsultationController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);


routes.post("/patient", PatientController.create);
routes.get("/patient",PatientController.get);
routes.delete("/patient/:id",PatientController.delete);
routes.patch("/patient/:id",PatientController.update);


routes.post("/consultation", ConsultationController.create);
routes.get("/consultation",ConsultationController.get);
routes.delete("/consultation/:id",ConsultationController.delete);
routes.patch("/consultation/:id",ConsultationController.update);


export default routes;
