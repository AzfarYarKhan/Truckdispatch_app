"use server";

import prisma from "@/app/libs/prismadb";
export async function getDrivers() {
  try {
    const drivers = await prisma.driver.findMany({
      include: {
        user: true,
      },
    });
    return drivers;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
