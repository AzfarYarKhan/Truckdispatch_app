import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { usertoken, password } = body;
  const decodedToken = jwt.verify(
    usertoken as string,
    process.env.JWT_SECRET as string
  ) as { id: string; email: string };

  const { id, email } = decodedToken;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { email },
    data: {
      hashedPassword: hashedPassword,
    },
  });
  return NextResponse.json({ message: "Password updated successfully." });
}
