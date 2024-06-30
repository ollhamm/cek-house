"use client";
import Image from "next/image";
import React from "react";

const UserIcon = () => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      src={"/images/userLogo.png"}
      alt="user logo"
    />
  );
};

export default UserIcon;
