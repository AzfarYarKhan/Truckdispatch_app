import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcryprt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;
  const hashedPassword = await bcryprt.hash(password, 12);
  const userexistalready = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userexistalready) {
    return NextResponse.json({ message: "Email is already in use" });
  }
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
