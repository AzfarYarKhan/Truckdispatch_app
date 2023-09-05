"use client";

import Image from "next/image";
import Link from "next/link";
import Signoutbutton from "../../buttons/signoutbutton";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

function Topbar() {
  const pathname = usePathname();
  const isActive = pathname?.includes("inbox");
  const handleLogoutClick = () => {
    signOut({ redirect: true, callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
      .then(() => {
        console.log("Successfully signing out");
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  };
  return (
    <nav className="topbar">
      <Link href="/admin/dashboard" className="flex items-center gap-4">
        <Image src="/vercel.svg" alt="logo" width={60} height={60} />
      </Link>

      <div className="flex items-center gap-1">
        <div className="flex items-center justify-between md:hidden">
          <Link
            href="/admin/inbox"
            className={`relative flex flex-col items-center gap-2 rounded-lg p-2 hover:bg-gray-800 ${
              isActive && "bg-gray-700"
            }`}
          >
            <div className="flex flex-col items-center gap-1">
              <Image
                src={
                  isActive
                    ? "/assets/admin/inboxactive.svg"
                    : "/assets/admin/inbox.svg"
                }
                alt="Inbox"
                width={16}
                height={16}
                className="object-contain"
              />
              <p
                className={`text-subtle-medium text-light-1 max-sm:hidden ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                Inbox
              </p>
            </div>
          </Link>
          <Link
            href=""
            className="relative flex flex-col items-center gap-2 rounded-lg p-2 hover:bg-gray-800"
          >
            <div className="flex flex-col items-center gap-1">
              <Image
                src="/assets/admin/logout.svg"
                alt="Inbox"
                width={16}
                height={16}
                className="object-contain"
                onClick={handleLogoutClick}
              />
              <p className="text-gray-400 max-sm:hidden">Logout</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
