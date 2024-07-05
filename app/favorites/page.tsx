import { EmptyState } from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getFavoriteListing from "../actions/getFavoriteListing";

import getCurrentUser from "../actions/getCurrentUser";
import FavoriteClients from "./FavoriteClients";

const Favorite = async () => {
  const listings = await getFavoriteListing();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Favorite"
          subtitle="Cek your Home page an click Favorite"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoriteClients listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Favorite;
