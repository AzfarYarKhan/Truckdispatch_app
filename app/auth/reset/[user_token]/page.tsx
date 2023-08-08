import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "../resetform";
import { useState } from "react";
import { User } from "@prisma/client";
let user: User | null = null;
let error: Boolean;

export default async function ResetPage({
  params,
}: {
  params: { user_token: string };
}) {
  const user_token = params.user_token;
  try {
    const decodedToken = jwt.verify(
      user_token as string,
      process.env.JWT_SECRET as string
    ) as { id: string; email: string };

    const { id, email } = decodedToken;
    user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!!user) {
      error = false;
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      error = true;
    } else {
      console.log(err);
    }
  }
  return (
    <>
      {user !== null && error === false ? (
        <ResetPasswordForm usertoken={user_token} />
      ) : (
        <div className="flex justify-center h-[50vh] mt-24">
          <div className="text-center bg-red-400 h-44  md:h-32  rounded-lg">
            <h1 className="text-2xl font-bold text-black mb-4 mt-4">
              Sorry, the link has expired ):
            </h1>
            <p className="px-6">
              Please make sure to use the link in the email within 15 minutes or
              else it expires
            </p>
          </div>
        </div>
      )}
    </>
  );
}
