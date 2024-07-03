"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  select?: boolean;
  className?: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  select,
  className = "",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (searchParams?.get("category") === label) {
      delete updateQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, searchParams, router]);

  return (
    <div
      onClick={handleClick}
      className={`relative flex flex-col items-center justify-center gap-2 p-3 transition-all duration-300 text-neutral-600 cursor-pointer ${className}`}
    >
      <Icon size={20} />
      <div className="font-semibold text-xs">{label}</div>
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] w-full transition-all duration-400
          ${select ? "bg-neutral-500 scale-x-100" : "bg-transparent scale-x-0"} 
          hover:bg-neutral-500 hover:scale-x-100`}
        style={{ transformOrigin: "center" }}
      ></div>
    </div>
  );
};

export default CategoryBox;
