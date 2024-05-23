"use server";

import { StripeRedirect } from "./schema";
import { InputType, ReturnType } from "./types";
import { absoluteURL } from "@/lib/utils";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { stripe } from "@/app/libs/stripe";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import Stripe from "stripe";

const handler = async (data: InputType): Promise<ReturnType> => {
  const currentUser = await getCurrentUser();
  const id = currentUser?.id;
  if (!currentUser) {
    return {
      error: "Unauthorizes",
    };
  }
  const settingUrl = absoluteURL("/admin/subscription");
  let url = "";
  try {
    const subscription = await prisma.proSubscription.findFirst();
    if (subscription && subscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: settingUrl,
      });
      url = stripeSession.url;
    } else {
      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Truckin Pro",
                description: "Unlimited drivers can be registered",
              },
              unit_amount: 1000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: settingUrl,
        cancel_url: settingUrl,
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        customer_email: currentUser.email,
        metadata: {
          id,
        },
      };
      const stripeSession = await stripe.checkout.sessions.create(
        sessionParams
      );
      url = stripeSession.url || "";
    }
  } catch (error) {
    return {
      error: error.message || "Something went wrong",
    };
  }
  revalidatePath(`/admin/subscription`);
  return { data: url };
};
export const stripeRedirect = createSafeAction(StripeRedirect, handler);
