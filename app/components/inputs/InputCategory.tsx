import React from "react";
import { IconType } from "react-icons";

interface InputCategoryProps {
  icon: IconType;
  label: string;
  select: boolean;
  onClick: (value: string) => void;
}

const InputCategory: React.FC<InputCategoryProps> = ({
  icon: Icon,
  label,
  select,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-0 p-4 flex flex-col gap-4  transition cursor-pointer ${
        select ? "bg-neutral-300" : "bg-neutral-100"
      }`}
    >
      <Icon size={20} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default InputCategory;
