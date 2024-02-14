"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Jobdata = {
  name: String;
  date: String;
  driver: string | null;
  status: String;
};

export const columns: ColumnDef<Jobdata>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },

  {
    accessorKey: "driver",
    header: "Driver",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const jobname: string = row.getValue("name");
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => router.push(`/admin/jobs/${jobname}`)}
            >
              Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
          <ToastContainer />
        </DropdownMenu>
      );
    },
  },
];
