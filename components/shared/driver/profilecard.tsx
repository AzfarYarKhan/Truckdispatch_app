"use client";

import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { ImOffice } from "react-icons/im";
import { BiSolidUser } from "react-icons/bi";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  image: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  company: string;
}

export function CardProfile({
  name,
  image,
  email,
  address,
  phone,
  company,
}: CardProps) {
  return (
    <Card className="xl:w-[300px] w-full border-2 px-1 border-slate-200 ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-950">
          Intro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col ">
          <div className=" rounded-full ">
            <Image
              src={image ? image : "/assets/driver/default_profile_image.png"}
              alt="image_icon"
              width={80}
              height={80}
              className="object-cover rounded-full"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            <div className="pt-1">
              <BiSolidUser />
            </div>
            <div className="font-light text-sm text-neutral-800"> {name}</div>
          </div>
          <div className="flex gap-4">
            <div className="pt-1">
              <MdEmail />
            </div>
            <div className="font-light text-sm text-neutral-800">{email}</div>
          </div>
          <div className="flex gap-4">
            <div className="pt-1">
              <ImOffice />
            </div>
            <div className="font-light text-sm text-neutral-800">{company}</div>
          </div>
          <div className="flex gap-4">
            <div className="pt-1">
              <FaPhoneAlt />
            </div>
            <div className="font-light text-sm text-neutral-800 ">{phone}</div>
          </div>
          <div className="flex gap-4">
            <div className="pt-1">
              <IoLocationSharp />
            </div>
            <div className="truncate font-light text-sm text-neutral-800">
              {address}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
export default CardProfile;
