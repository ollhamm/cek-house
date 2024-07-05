import prisma from "@/app/libs/prismaDb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListing() {
  try {
    const curretUser = await getCurrentUser();

    if (!curretUser) {
      return [];
    }
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(curretUser.favoriteIds || [])],
        },
      },
    });
    const safeFavorites = favorites.map((fav) => ({
      ...fav,
      createdAt: fav.createdAt.toISOString(),
    }));
    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
