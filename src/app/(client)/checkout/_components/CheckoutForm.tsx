"use client";
import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { postStripeSession } from "@/server-actions/stripeSession";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  {
    stripeAccount: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID as string,
  }
);

type CheckoutFormProps = {
  priceId: string;
  amount: number;
  quantity: number;
  imgUrl: string;
  productsArray: [];
  appFee: number;
};

export const CheckoutForm = ({
  priceId,
  amount,
  quantity,
  imgUrl,
  productsArray,
  appFee,
}: CheckoutFormProps) => {
  const fetchClientSecret = useCallback(async () => {
    const stripeResponse = await postStripeSession({
      priceId,
      amount,
      quantity,
      imgUrl,
      productsArray,
      appFee,
    });

    return stripeResponse.clientSecret;
  }, [priceId, amount, quantity]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <div className="m-4">
          <EmbeddedCheckout />
        </div>
      </EmbeddedCheckoutProvider>
    </div>
  );
};
