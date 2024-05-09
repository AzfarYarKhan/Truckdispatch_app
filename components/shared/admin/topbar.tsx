"use client";

import Image from "next/image";
import Link from "next/link";
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
          <div className="bottombar_link">
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
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
