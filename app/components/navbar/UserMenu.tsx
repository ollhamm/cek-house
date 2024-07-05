"use client";
import React, { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import UserIcon from "./UserIcon";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import Spiner from "../Spiner";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const handleLogout = useCallback(() => {
    setIsloading(true);
    signOut().finally(() => {
      setIsloading(false);
    });
  }, []);

  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-xs font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          {currentUser?.name}
          {/* {currentUser?.name} */}
        </div>
        <div
          onClick={handleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <UserIcon />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="z-50 absolute rounded-lg shadow-md w-[40vw] text-xs md:w-3/4 bg-white overflow-hidden right-0 top-12">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  name="My trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  name="My Favorite"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  name="My Reservation"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  name="My Properties"
                />
                <MenuItem onClick={rentModal.onOpen} name="My Home" />
                <hr />
                {isLoading ? (
                  <Spiner />
                ) : (
                  <div className="bg-red-400 text-center text-white">
                    <MenuItem onClick={handleLogout} name="Logout" />
                  </div>
                )}
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} name="Login" />
                <MenuItem onClick={registerModal.onOpen} name="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
