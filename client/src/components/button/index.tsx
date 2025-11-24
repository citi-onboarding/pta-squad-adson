import { Button as BaseButton } from "@/components/ui/button";
import { ReactNode, forwardRef } from "react";

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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      icon,
      bgColor = "#50E678",
      width,
      height = 48,
      onClickAction,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <BaseButton
        ref={ref}
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
);

Button.displayName = "Button";

export default Button;