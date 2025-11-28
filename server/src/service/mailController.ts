import MailHandler from "./mailHandler";
import { Request, Response } from "express";
import { mailTemplate } from "./mailTemplate";


export async function  sendMail(req: Request, res: Response) {
    try{

        const { 
            tutorName, 
            patientName, 
            appointmentDate, 
            appointmentTime, 
            userEmail 
        } = req.body;


        const htmlGerado = mailTemplate(
            tutorName, 
            patientName, 
            appointmentDate, 
            appointmentTime
        );

        const emailConfig = {
            userName: tutorName,
            userEmail: userEmail,
            subjectText: `Confirmação de Consulta: ${patientName}`, 
            html: htmlGerado
        };



        const mailResponse = await MailHandler(emailConfig);

        if(mailResponse){
            res.status(200).json({message: "Email sent sucessfully"})
        }else{
            res.status(500).json({message: "Error sending email"})
        }

    }catch(error){ 
        res.status(500).json({message: "Error sending email"})
    }
}