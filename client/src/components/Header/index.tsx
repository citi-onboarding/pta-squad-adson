import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CitiPet } from "../../assets";
import { PLogo } from "../../assets";

interface HeaderProps {
  atendimentoContent: React.ReactNode;
  cadastroContent: React.ReactNode;
}

export function Header({ atendimentoContent, cadastroContent }: HeaderProps) {
  const primaryColor = "text-[#7D1AD7]";
  const secundaryColor = "text-[#50E678]";
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
          <Image src={CitiPet} alt="Logo Citi Pet" className="h-20 w-auto" />
        </div>

        <TabsList className="h-auto bg-transparent p-0">
          <TabsTrigger
            value="atendimento"
            className={cn(
              "text-base font-semibold px-0 py-2 relative transition-colors rounded-none mx-4",
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
              "text-base font-semibold px-0 py-2 relative transition-colors rounded-none mx-4",
              "data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:border-b-2",
              activeBorderColor,
              inactiveTextColor
            )}
          >
            Cadastro
          </TabsTrigger>
        </TabsList>

        <div
          className={cn(primaryColor, "text-sm font-medium flex items-center")}
        >
          made with <span className="text-base m-1"> ♡ </span> and &lt;/&gt; by
          <Image src={PLogo} alt="logo citi" className="h-4 w-auto ml-1" />
        </div>
      </header>

      <TabsContent value="atendimento">{atendimentoContent}</TabsContent>
      <TabsContent value="cadastro">{cadastroContent}</TabsContent>
    </Tabs>
  );
}
