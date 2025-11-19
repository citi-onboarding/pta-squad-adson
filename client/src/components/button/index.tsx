import { Button as BaseButton } from "@/components/ui/button"; 
import { ReactNode } from "react";


interface ButtonProps { 
    // atributos manipuláveis
    text: string;               // texto obrigatório
    icon?: ReactNode;           // ícone opcional
    bgColor?: string;           // cor do botão
    textColor?: string;         // cor do texto
    width?: string;             // largura
    onClickAction?: () => void;
}


export default function Button({ 

    text, 
    icon, 
    bgColor = "#50E678",      // cor padrão
    textColor = "white",        // cor padrão
    width,

}: ButtonProps) {
    return (
        <BaseButton
            // valores padrão para todos os botões
            className={`flex items-center justify-center gap-2 px-20 rounded-full hover:opacity-20 h-12 bg-[${bgColor}]`}
              

            // propriedades dinâmicas
            style={{
                color: textColor,
                width: width
            }}
        >

            {icon && <span>{icon}</span>}
            <span>{text}</span> 

        </BaseButton>
    );
}