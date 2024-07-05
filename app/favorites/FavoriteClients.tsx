import React from "react";
import { SafeListings, SafeUser } from "../types";
import Container from "../components/Container";
import { Heading } from "../components/Heading";
import ListingCard from "../components/listings/listingCard";

interface FavoriteClientsProps {
  listings: SafeListings[];
  currentUser?: SafeUser | null;
}

const FavoriteClients: React.FC<FavoriteClientsProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List Your Fav" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {listings.map((lisFav) => (
          <ListingCard
            currentUser={currentUser}
            key={lisFav.id}
            data={lisFav}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClients;
