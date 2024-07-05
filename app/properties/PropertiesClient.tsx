"use client";

import React, { useCallback, useState } from "react";
import { SafeListings, SafeReservations, SafeUser } from "../types";
import Container from "../components/Container";
import { Heading } from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/listingCard";

interface PropertiesClientProps {
  listings: SafeListings[];
  curretUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings = [],
  curretUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Success Canceled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.respone?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties Page" subtitle="List your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {listings.map((lis) => (
          <ListingCard
            key={lis.id}
            data={lis}
            actionId={lis.id}
            onAction={onCancel}
            disabled={deletingId === lis.id}
            actionLabel="Delete"
            currentUser={curretUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
