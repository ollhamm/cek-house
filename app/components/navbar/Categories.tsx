"use client";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import React from "react";
import {
  GiBarn,
  GiBoatFishing,
  GiCactusTap,
  GiCampingTent,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow2 } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Pantai",
    icon: TbBeach,
    description: "Property Pantai",
  },
  {
    label: "Angin",
    icon: GiWindmill,
    description: "Property Kebun",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Property Modern",
  },
  {
    label: "Desa",
    icon: TbMountain,
    description: "Property Pedesaan",
  },
  {
    label: "Kolam",
    icon: TbPool,
    description: "Property Kolam",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "Property Pulau",
  },
  {
    label: "Ski",
    icon: FaSkiing,
    description: "Property Ski",
  },
  {
    label: "Candi",
    icon: GiCastle,
    description: "Property Candi",
  },
  {
    label: "Camping",
    icon: GiCampingTent,
    description: "Property Camping",
  },
  {
    label: "Dingin",
    icon: BsSnow2,
    description: "Property Musim Dingin",
  },
  {
    label: "Goa",
    icon: GiCaveEntrance,
    description: "Property Goa",
  },
  {
    label: "Panas",
    icon: GiCactusTap,
    description: "Property Musim Panas",
  },
  {
    label: "Lumbung",
    icon: GiBarn,
    description: "Property Musim Panas",
  },
  {
    label: "Mewah",
    icon: IoDiamond,
    description: "Property Musim Mewah",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");
  const pathname = usePathname();

  const page = pathname === "/";

  if (!page) {
    return null;
  }
  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            select={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
