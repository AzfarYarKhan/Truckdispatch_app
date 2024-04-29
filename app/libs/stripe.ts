import Stripe from "stripe";

export const stripe = new Stripe(process.env.Stripe_API_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});
