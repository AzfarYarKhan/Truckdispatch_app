"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Signoutbutton from "../../buttons/signoutbutton";
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants/driver";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
interface SidebarProps {
  currentUser: User | null;
}
export default function Sidebar({ currentUser }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        <Link
          prefetch={false}
          href="/driver/jobs"
          className="pb-2 max-xl:hidden"
        >
          <Image src="/vercel.svg" alt="logo" width={120} height={120} />
        </Link>

        <div className="mb-8 max-xl:hidden flex flex-col justify-center items-center text-center">
          <div className="w-120 h-120">
            <div
              className="w-full h-full rounded-full overflow-hidden"
              style={{
                maskImage:
                  "radial-gradient(circle, white 50%, transparent 50%)",
                WebkitMaskImage:
                  "radial-gradient(circle, white 50%, transparent 50%)",
              }}
            >
              <Image
                src={
                  currentUser?.image
                    ? currentUser.image
                    : "/assets/driver/default_profile_image.png"
                }
                alt="image_icon"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-sm font-medium pt-4 text-gray-400">
            {currentUser?.name}
          </p>
        </div>

        {sidebarLinks.map((link) => {
          const isActive =
            (pathname?.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              prefetch={false}
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
      </div>
      <div className="mt-10 px-6">
        <Signoutbutton />
      </div>
    </section>
  );
}
