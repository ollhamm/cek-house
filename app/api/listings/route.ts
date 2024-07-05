import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  for (const [key, value] of Object.entries(body)) {
    if (!value) {
      return NextResponse.json(
        { error: `Missing value for ${key}` },
        { status: 400 }
      );
    }
  }

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });
    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "Error creating listing" },
      { status: 500 }
    );
  }
}

