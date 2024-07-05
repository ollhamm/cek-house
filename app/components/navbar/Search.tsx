"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-full lg:w-2/5 py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer mx-4 lg:mx-8">
      <div className="flex flex-row items-center justify-between w-full px-6">
        <div className="text-sm text-gray-600 flex flex-row items-center gap-3 w-full">
          <div className="hidden sm:block flex-1 text-left">Search...</div>
          <div className="p-2 bg-blue-600 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
