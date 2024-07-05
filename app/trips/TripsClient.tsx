"use client";

import React, { useCallback, useState } from "react";
import { SafeReservations, SafeUser } from "../types";
import Container from "../components/Container";
import { Heading } from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/listingCard";

interface TripsClientProps {
  reservations: SafeReservations[];
  curretUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations = [],
  curretUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
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
      <Heading title="Trips Page" subtitle="where you've been" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel"
            currentUser={curretUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
