"use client";
import React, { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Cart = ({ children }: { children: ReactNode }) => (
  <CartProvider
    cartMode="checkout-session"
    stripe={stripePromise as unknown as string}
    currency="USD"
    shouldPersist={false}
  >
    <>{children}</>
  </CartProvider>
);

export default Cart;
