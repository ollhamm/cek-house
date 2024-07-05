"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import ListingCategory from "./ListingCategory";
import { IconType } from "react-icons";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  category: string;
  icon: IconType;
  label: string;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  icon: Icon,
  label,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-md flex flex-row items-center gap-2">
          <div>House By : {user?.name}</div>
        </div>
        <div className="flex flex-row items-center gap-5 font-light text-neutral-400">
          <div>{guestCount} Guests</div>
          <div>{roomCount} Room</div>
          <div>{bathroomCount} Bathroom</div>
        </div>
      </div>
      <hr />
      <div className="flex flex-row items-center font-semibold">
        <div className="underline">Category : {category}</div>
      </div>
      <div className="flex flex-row items-center font-light">
        {" "}
        Description : {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
