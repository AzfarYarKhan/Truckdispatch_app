"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ActionsMenu from "./ActionsMenu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Driverdata = {
  id: string;
  name: String | null;
  email: string;
  image: String | null;
  company: String | null;
  jobcount: number;
};

export const columns: ColumnDef<Driverdata>[] = [
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      if (row.getValue("image")) {
        return (
          <div className=" flex items-center justify-center flex-shrink-0">
            <img
              src={row.getValue("image")}
              alt="Avatar"
              className="rounded-full h-10 w-10 mr-2 max-sm:hidden  flex-shrink-0 object-cover"
            />
          </div>
        );
      }
      return null; // Return null if no image URL is available
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "jobcount",
    header: "Job count",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const email: string = row.getValue("email");
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => router.push(`/admin/drivers/${email}`)}
            >
              Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ActionsMenu email={email} />
          </DropdownMenuContent>
          <ToastContainer />
        </DropdownMenu>
      );
    },
  },
];
