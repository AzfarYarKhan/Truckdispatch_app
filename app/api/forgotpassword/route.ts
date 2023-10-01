import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcryprt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "@/app/libs/email";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;
  const userexistalready = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!userexistalready) {
    return NextResponse.json({ message: "No user with this email exits" });
  }
  const payload = {
    id: userexistalready.id,
    email: userexistalready.email,
    createdAt: userexistalready.createdAt,
  };
  const expirationTimeInSeconds = 900;
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not defined.");
  }
  const user_token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expirationTimeInSeconds,
  });

  // const user_token = jwt.sign(payload, process.env.JWT_SECRET);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset/${user_token}`;

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: userexistalready.email,
    subject: "Reset your password",
    text: `Reset your password by visiting the following link: ${url}`,
    html: `<p>Reset your password by <a href="${url}">clicking here</a>.</p>`,
  };

  try {
    await transporter.sendMail({
      ...mailOptions,
    });
    return NextResponse.json({
      message: "An email has been sent to you to reset your password.",
    });
  } catch (error) {
    console.log(error);
  }
}
