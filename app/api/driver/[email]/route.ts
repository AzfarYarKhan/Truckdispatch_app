import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { email: string } }
) {
  const email = params.email;
  console.log(email);
  try {
    const user = await prisma.user.delete({
      where: { email: email as string },
    });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
