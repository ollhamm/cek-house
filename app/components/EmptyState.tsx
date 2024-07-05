"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Heading } from "./Heading";
import { Button } from "./Button";

interface EmpatyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export const EmptyState: React.FC<EmpatyStateProps> = ({
  title = "No exact matches",
  subtitle = "try or removing filters",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="flex h-[60vh] flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button label="Remove Filters" onClick={() => router.push("/")} />
        )}
      </div>
    </div>
  );
};
