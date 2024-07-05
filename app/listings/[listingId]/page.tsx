import getCurrentUser from "@/app/actions/getCurrentUser";
import getIdListing from "@/app/actions/getIdListing";
import ClientOnly from "@/app/components/ClientOnly";
import { EmptyState } from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const pageFav = async ({ params }: { params: IParams }) => {
  const listing = await getIdListing(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default pageFav;
