"use client";
import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { postStripeSession } from "@/server-actions/stripeSession";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

type CheckoutFormProps = {
  priceId: string;
  amount: number;
  quantity: number;
  imgUrl: string;
  productsArray: [];
};

export const CheckoutForm = ({
  priceId,
  amount,
  quantity,
  imgUrl,
  productsArray,
}: CheckoutFormProps) => {
  const fetchClientSecret = useCallback(async () => {
    const stripeResponse = await postStripeSession({
      priceId,
      amount,
      quantity,
      imgUrl,
      productsArray,
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
