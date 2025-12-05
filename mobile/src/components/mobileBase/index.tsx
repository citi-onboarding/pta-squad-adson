import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AppointmentCard, appointmentType } from "../cardConsultation";


interface Props {
    logo: any;
}


export interface Appointment {
    patientName: string;
    tutorName: string;
    date: string;
    time: string;
    vetName: string;
    appointmentType: appointmentType;
    animalImage: any;
    onClick?: () => void;
}


export default function BaseMobile({ logo }: Props) {


    const mockAppointments: Appointment[] = [
        {
            patientName: "Mel",
            tutorName: "Carla",
            date: "10/01",
            time: "08:00",
            vetName: "Dra. Ana Paula",
            appointmentType: "Vacinação",
            animalImage: require("../../assets/dog.png"),
            onClick: () => console.log("Clicou na Mel"),
        },
        {
            patientName: "Thor",
            tutorName: "João",
            date: "10/01",
            time: "09:30",
            vetName: "Dr. Marcos",
            appointmentType: "Primeira Consulta",
            animalImage: require("../../assets/cat.png"),
            onClick: () => console.log("Clicou no Thor"),
        },
        {
            patientName: "Luna",
            tutorName: "Marina",
            date: "10/01",
            time: "11:00",
            vetName: "Dra. Vivian",
            appointmentType: "Check-up",
            animalImage: require("../../assets/cow.png"),
            onClick: () => console.log("Clicou na Luna"),
        },
        {
            patientName: "Lua",
            tutorName: "Maria",
            date: "11/01",
            time: "13:00",
            vetName: "Dra. Valquiria",
            appointmentType: "Retorno",
            animalImage: require("../../assets/cow.png"),
            onClick: () => console.log("Clicou na Lua"),
        },
    ];


    return (
        <View className="flex-1 bg-white">


            <View className="items-center mt-14">
                <Image source={logo} />
                <View className="mt-6">
                    <Text className="px-8 text-[25px] font-bold pb-2">
                        Sua  Agenda
                    </Text>
                    <Text className="px-8 text-[14px] font-semibold">
                        Veja aqui todos os seus pacientes agendados para hoje.
                    </Text>
                </View>


                <TouchableOpacity
                    onPress={() => console.log("Clicou!")}
                    className="bg-white rounded-full h-[70px] w-[254px] justify-center items-center shadow mt-6"
                >
                    <Text className="text font-semibold">Agenda</Text>
                </TouchableOpacity>
            </View>


            <View className="mt-6" style={{ gap: 12, alignItems: "center" }}>
                {mockAppointments.map((consulta, index) => (
                    <AppointmentCard
                        key={index}
                        patientName={consulta.patientName}
                        tutorName={consulta.tutorName}
                        date={consulta.date}
                        time={consulta.time}
                        vetName={consulta.vetName}
                        appointmentType={consulta.appointmentType}
                        animalImage={consulta.animalImage}
                        onClick={consulta.onClick}
                    />
                ))}
            </View>


            <View className="mt-6">
                <View className="bg-[#50E678] w-[430px] h-[75px] rounded-t-[30px] items-center justify-center">
                    <View className="bg-black h-[5px] w-[134px] rounded-full mt-6" />
                </View>
            </View>


        </View>
    );
}
