"use client";

import React from "react";

interface MenuItemProps {
  onClick: () => void;
  name: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, name }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-200 transition font-semibold"
    >
      {name}
    </div>
  );
};

export default MenuItem;
