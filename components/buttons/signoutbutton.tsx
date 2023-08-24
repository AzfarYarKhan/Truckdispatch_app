"use client";
import Image from "next/image";
import { User } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signoutbutton = () => {
  const router = useRouter();
  const handleClick = () => {
    signOut({ redirect: true, callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
      .then(() => {
        console.log("Successfully signing out");
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  };
  return (
    <button className="w-full" onClick={handleClick}>
      <div className="flex cursor-pointer gap-4 p-4 rounded-lg flex-1  hover:bg-gray-800">
        <Image
          src="/assets/admin/logout.svg"
          alt="logout"
          width={24}
          height={24}
        />
        <p className="text-gray-400 max-xl:hidden ">Logout</p>
      </div>
    </button>
  );
};

export default Signoutbutton;
