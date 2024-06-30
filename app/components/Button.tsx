"use client";
import { IconType } from "react-icons";
import React from "react";

interface ButtonProps {
  label: string;
  onClink: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClink,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClink}
      disabled={disabled}
      className={`relative disabled: opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-90 transition w-full 
        ${outline ? "bg-white" : "bg-blue-600"}
        ${outline ? "border-gray-800" : "border-blue-600"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "font-light" : "font-semibold"}
    `}
    >
      {Icon && <Icon size={20} className="absolute left-4 top-3 " />}
      {label}
    </button>
  );
};