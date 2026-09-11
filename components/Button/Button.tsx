import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

import css from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, type = "button", className, ...rest }: ButtonProps) => {
  return (
    <button type={type} className={clsx(css.button, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
