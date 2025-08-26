import React from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({ children, className }) => {
  return (
    <p className={twMerge("block dark:text-white text-neutral-800", className)}>
      {children}
    </p>
  );
};
