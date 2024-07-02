"use client";
import React, { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import UserIcon from "./UserIcon";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import RegisterModal from "../modal/RegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          {currentUser?.name}
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
        <div className="absolute rounded-lg shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} name="My trips" />
                <MenuItem onClick={() => {}} name="My Favorite" />
                <MenuItem onClick={() => {}} name="My Reservation" />
                <MenuItem onClick={() => {}} name="My Properties" />
                <MenuItem onClick={() => {}} name="My Home" />
                <hr />
                <div className="bg-red-500 text-center text-white">
                  <MenuItem onClick={() => signOut()} name="Logout" />
                </div>
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
