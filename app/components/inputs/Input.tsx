"use client";
import React, { useState } from "react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar, BiShow, BiHide } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldError;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={20}
          className="text-neutral-600 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={inputType}
        className={`
          peer
          w-full
          p-4
          mb-5
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-60
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-red-600" : "border-neutral-300"}
          ${errors[id] ? "focus:border-red-600" : "focus:border-neutral-400"}
          `}
      />
      {type === "password" && (
        <div
          onClick={toggleShowPassword}
          className="absolute top-5 right-4 cursor-pointer"
        >
          {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
        </div>
      )}
      <label
        className={`absolute text-sm duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-4`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
