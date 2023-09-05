"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

function Bottombar() {
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname?.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          const isInbox = link.label === "Inbox";
          if (!isInbox) {
            return (
              <Link
                href={link.route}
                key={link.label}
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
          }

          return null;
        })}
      </div>
    </section>
  );
}

export default Bottombar;
