//import { getServerSession } from "next-auth";
import { getServerSession as originalGetServerSession } from "next-auth";
import { cookies, headers } from "next/headers";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  // return await getServerSession(authOptions);
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };
  const AuthOptions = authOptions;
  // @ts-ignore -
  const session = await originalGetServerSession(req, res, AuthOptions);
  return session;
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error: any) {
    console.log("Error:", error);
    return null;
  }
}
