"use client";

import React from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

interface HartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

export const HeartButton: React.FC<HartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={20}
        className="absolute fill-white top-[2px] right-[2px]"
      />
      <AiFillHeart
        size={20}
        className={`absolute top-[2px] right-[2px] ${
          hasFavorited ? "fill-red-500" : "fill-neutral-400/70"
        }`}
      />
    </div>
  );
};
