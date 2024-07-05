"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import { Heading } from "../Heading";
import Image from "next/image";
import { HeartButton } from "../HeartButton";

interface ListingHeadProps {
  title: string;
  location: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  location,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const locations = getByValue(location);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${locations?.region}, ${locations?.label}`}
      />
      <div className="w-full h-[80vh] overflow-hidden rounded-lg relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-10 right-10">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
