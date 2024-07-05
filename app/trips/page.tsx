import { EmptyState } from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const Trips = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Not Available" subtitle="Please Login Account" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });
  console.log("Reservations:", reservations);

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No Trips" subtitle="Reservations Now" />
      </ClientOnly>
    );
  }

  console.log("Rendering TripsClient with reservations");
  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Trips;
