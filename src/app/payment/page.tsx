"use client";

import CheckoutPage from "@/components/payments/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useUser } from "@clerk/nextjs";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Payment = () => {
  const amount = 49.99;
  const { user } = useUser();
  const buyerId = user?.id!;

  return (
    <main className="max-w-xl md:mx-auto p-10 text-black text-center m-10 rounded-md bg-gradient-to-tr to-[#E6E6E6] from-[#FFF0F0] shadow-[8px_8px_0_0_#FE3D02] border-black border-2">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Teaser Fest</h1>
        <h2 className="text-2xl">
          has requested <span className="font-bold">${amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount), // cents
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} buyerId={buyerId} />
      </Elements>
    </main>
  );
};

export default Payment;
