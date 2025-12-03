"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CitiPet, MadeWith } from "../../assets";
import RegistrationForm from "../registerForm";
import ServicePage from "@/app/serviceScreen/page";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";



export function Header() {
  const [value,setValue] = useState("service");
  const activeBorderColor = "border-b-[#50E678]";
  const inactiveTextColor = "text-[#242424]";
  const router = useRouter();
  const params = useParams();

  return (
    <Tabs value = {value} onValueChange={setValue} className="w-full">
      <header
        className={cn(
          "w-full px-4 md:px-8 py-4 flex justify-between items-center bg-white",
          "border-b border-gray-200"
        )}
      >
        <div className="flex items-center">
          <Image src={CitiPet} alt="Logo Citi Pet"/>
        </div>

        <TabsList className="h-auto bg-transparent p-0">
          <TabsTrigger
            value="service"
            className={cn(
              " font-normal text-[#242424] px-0 py-2 relative transition-colors rounded-none mx-4",
              "data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-b-2",
              activeBorderColor,
              inactiveTextColor
            )}
            onClick={()=>{
              router.push("/")
              setValue("service");
            }}
          >
            Atendimento
          </TabsTrigger>

          <TabsTrigger
            value="register"
            className={cn(
              "font-normal text-[#242424] px-0 py-2 relative transition-colors rounded-none mx-4",
              "data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-b-2",
              activeBorderColor,
              inactiveTextColor
            )}
            onClick={()=>{
              router.push("/")
              setValue("register");
            }}
          >
            Cadastro
          </TabsTrigger>
        </TabsList>

        <Image src={MadeWith} alt="Made with image"/>
      </header>
      

      <TabsContent value="service">
        {!params.id ?
          <ServicePage/>
          :
          null
        }
      </TabsContent>

      <TabsContent value="register">
        {!params.id ?
          <RegistrationForm/>
          :
          null
        }
      </TabsContent>
    </Tabs>
  );
}
