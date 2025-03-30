"use client";
import { cn } from "../lib/utils";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
