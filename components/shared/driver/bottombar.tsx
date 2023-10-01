"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants/driver";
import { signOut } from "next-auth/react";

const handleLogoutClick = () => {
  signOut({ redirect: true, callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
    .then(() => {
      console.log("Successfully signing out");
    })
    .catch((error) => {
      console.log("Error signing out:", error);
    });
};

function Bottombar() {
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname?.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              prefetch={false}
              className={`bottombar_link ${isActive && "bg-gray-700"}`}
            >
              <Image
                src={isActive ? link.imgURLactive : link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className="object-contain"
              />
              <p
                className={`text-subtle-medium text-light-1 max-sm:hidden ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
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
    </section>
  );
}

export default Bottombar;
