import { db } from "@/db";
import { showcases, ticketTypes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import Stripe from "stripe";
import CheckoutForm from "./_components/CheckoutForm";
import { Input } from "@/components/ui/input";
import { currentUser } from "@clerk/nextjs/server";
import { SignUp, SignUpButton } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const ShowcaseDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const user = await currentUser();

  console.log("User", user);

  if (!user) redirect("/sign-up");

  const showcaseList = await db
    .select()
    .from(showcases)
    .where(eq(showcases.id, id));

  if (showcases == null) return notFound();

  const showcase = showcaseList[0];

  const tickets = await db
    .select()
    .from(ticketTypes)
    .where(eq(ticketTypes.showcase, id));

  if (tickets == null) return <h1>No Tickets Found</h1>;

  const ticket = tickets[0];

  const paymentIntent = await stripe.paymentIntents.create({
    amount: ticket.priceInCents,
    currency: "USD",
    metadata: {
      ticketId: ticket.id,
      showcaseId: showcase.id,
    },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }

  return (
    <>
      {/* <Input onChange={(event) => setCustomer(event.target.value)} /> */}

      <CheckoutForm
        showcase={showcase}
        ticket={ticket}
        clientSecret={paymentIntent.client_secret}
        // firstName={firstName}
        firstName={user?.firstName}
      />
    </>
  );
};

export default ShowcaseDetailPage;
