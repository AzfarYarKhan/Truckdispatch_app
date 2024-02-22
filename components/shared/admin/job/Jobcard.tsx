"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  pickup_loc: string;
  dropoff_loc: string;
  date: string;
  distance: number | string;
  driver: string;
  driver_email: string;
  status: string;
}

export function JobCard({
  pickup_loc,
  dropoff_loc,
  date,
  distance,
  driver,
  driver_email,
  status,
}: CardProps) {
  return (
    <Card className="xl:w-[400px] w-full border-2 px-1 border-slate-200 ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-950">
          Job Details
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            <div>Pickup:</div>
            <div className="truncate overflow-ellipsis whitespace-nowrap max-w-[250px] font-light text-sm text-neutral-800 pt-0.5">
              {pickup_loc}
            </div>
          </div>
          <div className="flex gap-4">
            <div>Dropoff:</div>
            <div className="truncate overflow-ellipsis whitespace-nowrap max-w-[250px] font-light text-sm text-neutral-800 pt-0.5">
              {dropoff_loc}
            </div>
          </div>

          <div className="flex gap-4">
            <div>Date:</div>
            <div className="font-light text-sm text-neutral-800 pt-0.5">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="flex gap-4">
            <div>Distance:</div>
            <div className="font-light text-sm text-neutral-800  pt-0.5">
              {distance} Metres
            </div>
          </div>
          <div className="flex gap-4">
            <div>Driver:</div>
            <div className="truncate font-light text-sm text-neutral-800 pt-0.5">
              <Link
                href={`/admin/drivers/${driver_email}`}
                className="text-blue-500"
              >
                {driver}
              </Link>
            </div>
          </div>
          <div className="flex gap-4">
            <div>Status:</div>
            <div className="truncate font-light text-sm text-neutral-800 pt-0.5">
              {status}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
export default JobCard;
