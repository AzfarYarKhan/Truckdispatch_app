"use client";

import Image from "next/image";
import Link from "next/link";
import Signoutbutton from "../../buttons/signoutbutton";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants/index";
import { FaCrown } from "react-icons/fa6";
import { checkSubscription } from "@/app/libs/subscription";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const isActivesubscriptionlink = pathname?.includes("/admin/subscription");
  const [isValidSubscription, setIsValidSubscription] = useState(false);

  useEffect(() => {
    const fetchSubscriptionValidity = async () => {
      const isValid = await checkSubscription();
      setIsValidSubscription(isValid);
    };

    fetchSubscriptionValidity();
  }, []);
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        <Link href="/admin/dashboard" className="pb-12 max-xl:hidden">
          <Image src="/vercel.svg" alt="logo" width={120} height={120} />
        </Link>

        {sidebarLinks.map((link) => {
          const isActive =
            (pathname?.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-gray-700"}`}
            >
              <img
                src={isActive ? link.imgURLactive : link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className="fill-current text-blue-600"
              />

              <p
                className={`max-xl:hidden ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}

        <Link
          href="/admin/subscription"
          key="subscription"
          className={`leftsidebar_link ${
            isActivesubscriptionlink && "bg-gray-700"
          }`}
        >
          <FaCrown
            className={`h-6 w-6 ${
              isActivesubscriptionlink ? "text-blue-600" : "text-white"
            }`}
          />

          <p
            className={`max-xl:hidden ${
              isActivesubscriptionlink ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {isValidSubscription ? "Cancel Pro" : "Upgrade to Pro"}
          </p>
        </Link>
      </div>
      <div className="mt-10 px-6">
        <Signoutbutton />
      </div>
    </section>
  );
}
