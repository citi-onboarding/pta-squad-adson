import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function BaseMobile() {
  return (
    <View>
        <View>
            {/* Espaço para a imagem */}
        </View>

      
        <View>
            <Text className="px-8 text-[25px] font-bold pb-2">
                Sua Agenda
            </Text>

            <Text className="px-8 text-[14px] font-semibold">
                Veja aqui todos os seus pacientes agendados para hoje.
            </Text>
        </View>

      
        <View className="items-center mt-9">
            <TouchableOpacity
                onPress={() => console.log("Clicou!")}
                className="bg-white rounded-full h-[70px] w-[254px] justify-center items-center shadow"
            >
            </TouchableOpacity>
        </View>


        <View className="mt-6">
            <View className="bg-[#50E678] w-[430px] h-[75px] rounded-t-[30px] items-center justify-center">
                <View className="bg-[black] h-[5px] w-[134px] rounded-full mt-6"/>
            </View>
        </View>

    </View>
  );
}
