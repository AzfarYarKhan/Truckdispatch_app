"use client";

import Image from "next/image";
import Link from "next/link";

function Topbar() {
  return (
    <nav className="topbar">
      <Link
        href="/driver/jobs"
        className="flex items-center gap-4 p-3 max-sm:p-1"
      >
        <Image src="/vercel.svg" alt="logo" width={60} height={70} />
      </Link>
    </nav>
  );
}

export default Topbar;
