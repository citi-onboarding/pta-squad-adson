import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CitiPet, MadeWith } from "../../assets";

interface HeaderProps {
  serviceContent: React.ReactNode;
  registerContent: React.ReactNode;
}

export function Header({ serviceContent, registerContent }: HeaderProps) {
  const activeBorderColor = "border-b-[#50E678]";
  const inactiveTextColor = "text-[#242424]";

  return (
    <Tabs defaultValue="atendimento" className="w-full">
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
            value="atendimento"
            className={cn(
              " font-normal text-[#242424] px-0 py-2 relative transition-colors rounded-none mx-4",
              "data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-b-2",
              activeBorderColor,
              inactiveTextColor
            )}
          >
            Atendimento
          </TabsTrigger>

          <TabsTrigger
            value="cadastro"
            className={cn(
              "font-normal text-[#242424] px-0 py-2 relative transition-colors rounded-none mx-4",
              "data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-b-2",
              activeBorderColor,
              inactiveTextColor
            )}
          >
            Cadastro
          </TabsTrigger>
        </TabsList>

        <Image src={MadeWith} alt="Made with image"/>
      </header>

      <TabsContent value="atendimento">{serviceContent}</TabsContent>
      <TabsContent value="cadastro">{registerContent}</TabsContent>
    </Tabs>
  );
}
