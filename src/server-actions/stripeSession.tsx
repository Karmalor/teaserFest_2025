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
  const returnUrl =
    "http://localhost:3000/checkout-return?session_id={CHECKOUT_SESSION_ID}";

  // const returnUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout-return`;

  const user = await currentUser();

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
      mode: "payment",
      payment_intent_data: {
        application_fee_amount: appFee,
      },
      metadata: {
        appFee,
      },
      return_url: returnUrl,
      allow_promotion_codes: true,
      // discounts: [
      //   {
      //     coupon: "",
      //   },
      // ],
      custom_fields: [
        {
          key: "firstName",
          label: {
            type: "custom",
            custom: `Ticketholder's First Name`,
          },
          text: {
            default_value: user?.firstName,
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
            default_value: user?.lastName,
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
