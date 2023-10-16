import { ReactNode, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button { ...props }>{ children }</button>
  );
}
