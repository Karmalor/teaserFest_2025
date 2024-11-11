"use server";

import { useShoppingCart } from "@/context/ShoppingCartContext";
import { currentUser } from "@clerk/nextjs/server";
import { Stripe } from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY as string;

const connectedAccount = process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID as string;

const stripe = new Stripe(apiKey);

interface NewSessionOptions {
  priceId: string;
  amount: number;
  quantity: number;
  imgUrl: string;
  productsArray: [];
  appFee: number;
}

export const postStripeSession = async ({
  priceId,
  amount,
  quantity,
  imgUrl,
  productsArray,
  appFee,
}: NewSessionOptions) => {
  const returnUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout-return?session_id={CHECKOUT_SESSION_ID}`;

  // const returnUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout-return`;

  const user = await currentUser();

  // if (!user) {
  //   const user = { firstName: "" as string, lastName: "" as string };
  // }

  // const coupon = await stripe.coupons.create({
  //   percent_off: 20,
  //   duration: "once",
  // });

  // const promotionCode = await stripe.promotionCodes.create({
  //   coupon: "rIpMeUUd",
  //   code: "VIPCODE",
  // });

  const session = await stripe.checkout.sessions.create(
    {
      ui_mode: "embedded",
      line_items: productsArray,
      automatic_tax: {
        enabled: true,
      },
      mode: "payment",
      payment_intent_data: {
        application_fee_amount: appFee,
      },
      metadata: {
        appFee,
        user: user?.primaryEmailAddress?.emailAddress as string,
      },
      return_url: returnUrl,
      allow_promotion_codes: true,
      custom_fields: [
        {
          key: "firstName",
          label: {
            type: "custom",
            custom: `Ticketholder's First Name`,
          },
          text: {
            default_value: user?.firstName as string,
          },
          type: "text",
        },
        {
          key: "lastName",
          label: {
            type: "custom",
            custom: `Ticketholder's Last Name`,
          },
          text: {
            default_value: user?.lastName as string,
          },
          type: "text",
        },
      ],
    },
    {
      stripeAccount: connectedAccount,
    }
  );

  if (!session.client_secret)
    throw new Error("Error initiating Stripe session");

  return {
    clientSecret: session.client_secret,
  };
};
