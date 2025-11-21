import { Button as BaseButton } from "@/components/ui/button";
import { ReactNode } from "react";


interface ButtonProps {
    text?: string;
    icon?: ReactNode;
    bgColor?: string;
    width?: number;
    height?: number;
    onClickAction?: () => void;
    className?: string;
    type?: "button" | "submit";
}


export default function Button({
    text,
    icon,
    bgColor = "#50E678",
    width,
    height = 48,
    onClickAction,
    className = "",
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <BaseButton
            className={
                "flex items-center justify-center gap-2 px-10 rounded-full hover:opacity-70 shadow font-bold " +
                className
            }
            onClick={onClickAction}
            type={type}
            style={{
                backgroundColor: bgColor,
                width: width,
                height: height,
                color: "white"
            }}
            {...props}
        >
            {icon && <span>{icon}</span>}
            {text && <span>{text}</span>}
        </BaseButton>
    );
}
