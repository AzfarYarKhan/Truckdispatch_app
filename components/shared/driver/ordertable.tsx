"use client";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Job {
  Name: string;
  Status: string;
  Distance: number;
  Date: string;
}

export function OrdersTable({ Jobs }: { Jobs: Job[] }) {
  const PAGE_LIMIT = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const startIndex = currentPage * PAGE_LIMIT;
  const endIndex = (currentPage + 1) * PAGE_LIMIT;
  const paginatedJobs = Jobs.slice(startIndex, endIndex);
  return (
    <div>
      <Table className="max-w-[800px]">
        <TableCaption>A list of your recent Jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead className="w-[150px]">Status</TableHead>
            <TableHead className="w-[150px]">Distance</TableHead>
            <TableHead className="w-[150px]">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedJobs.map((Job: Job) => (
            <TableRow key={Job.Name}>
              <TableCell className="font-medium">{Job.Name}</TableCell>
              <TableCell>{Job.Status}</TableCell>
              <TableCell>{Job.Distance}</TableCell>
              <TableCell>
                {new Date(Job.Date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ReactPaginate
        previousLabel={
          <span className="inline-block p-1  rounded-md min-w-3">
            <GrFormPrevious />
          </span>
        }
        nextLabel={
          <span className="inline-block  p-1 rounded-md ">
            <MdNavigateNext />
          </span>
        }
        breakLabel={
          <span className="inline-block p-2 border rounded-md min-w-3">
            ...
          </span>
        }
        breakClassName={"break-me"}
        pageCount={Math.ceil(Jobs.length / PAGE_LIMIT)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center mt-4 space-x-2 h-12"}
        activeClassName={"bg-blue-500 text-white p-2 rounded-md"}
        pageClassName={"inline-block p-2 border rounded-md"}
        previousClassName={"inline-block p-2 border rounded-md"}
        nextClassName={"inline-block p-2 border rounded-md"}
      />
    </div>
  );
}
export default OrdersTable;
