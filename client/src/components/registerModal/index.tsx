import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Button from "../button";
import citiIcon from "@/assets/citiIcon.svg";

const formSchema = z.object({
  email: z.string().email("Digite um e-mail válido").min(1, "O campo de e-mail é obrigatório"),
});

type FormData = z.infer<typeof formSchema>;


export default function RegisterModal() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("JSON do formulário:", JSON.stringify(data, null, 2));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (!state) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          text="Finalizar Cadastro"
          type="submit"
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] w-full p-0 !rounded-[32px] overflow-hidden bg-white border-none shadow-2xl" aria-describedby={undefined}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-10">
          <DialogHeader className="mb-20 relative w-full h-[80px]">
            <div className="absolute w-[200px] h-[80px] left-1/2 -translate-x-1/2">
                <Image
                    src={citiIcon}
                    alt="Citi Logo"
                    fill
                    className="object-contain"
                />
            </div>

            <DialogTitle className="absolute top-[90px] w-full text-center text-black px-4">
              <div className="text-[18px] leading-tight">
                <span className="font-bold">Cadastro finalizado! </span>
                <span className="font-normal">Envie o <br/> comprovante para o </span>
                <span className="font-bold">tutor</span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="w-full flex flex-col gap-2 mb-8">
            <label htmlFor="email" className="text-black font-bold text-base pl-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className= "px-4 py-2 rounded-lg border border-black bg-white text-base *placeholder:text-[#A6A6A6] focus-visible:outline-none w-full h-[54px]"

              placeholder="Digite aqui..."
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm pl-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <Button
            text="Enviar"
            type="submit"
            width={420}
            height={56}
            className="font-semibold text-lg !bg-[#50E678] !rounded-full text-white w-full"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
