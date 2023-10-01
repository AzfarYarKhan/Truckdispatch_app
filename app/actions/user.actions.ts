"use server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import * as z from "zod";
import prisma from "@/app/libs/prismadb";

const formSchema = z.object({
  image: z.string().url().nonempty(),
  company: z.string().min(3).max(30),
  address: z.string().min(10).max(30),
  phone: z.string().min(5).max(20),
});

export async function updateUser(data: z.infer<typeof formSchema>) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      console.error("Current user is null or undefined.", currentUser);
      return;
    }

    const driver = await prisma.driver.create({
      data: {
        company: data.company,
        address: data.address,
        phone_number: data.phone,
        userId: currentUser.id,
      },
    });

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        image: data.image,
      },
    });

    console.log("Data inserted successfully:");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}
