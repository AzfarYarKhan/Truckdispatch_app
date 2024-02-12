import { Driverdata, columns } from "./columns";
import { DataTable } from "./data-table";
import { PrismaClient, UserInclude, User, Driver } from "@prisma/client";
import React, { useState, useEffect } from "react";

const prisma = new PrismaClient();

async function getData(): Promise<Driverdata[]> {
  try {
    const usersAndDrivers = await prisma.user.findMany({
      where: {
        role: "driver",
      },
      include: {
        driver: {
          include: {
            jobs: true,
          },
        },
      },
    });

    const driverData = usersAndDrivers.map((user) => {
      const { id, name, email, image } = user;
      const company = user.driver?.company ?? null;
      const jobcount = user.driver?.jobs.length ?? 0;
      return { id, name, email, image, company, jobcount };
    });

    return driverData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export default async function Drivers() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10 md:px-10 lg:px-32 mt-28">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
