"use server";
import prisma from "@/app/libs/prismadb";
const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const subscription = await prisma.proSubscription.findFirst();
  if (!subscription) {
    return false;
  }
  const isValid =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
  return !!isValid;
};
