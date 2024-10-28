import { db } from "@/db";
import { showcaseTable, ticketTypesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import React from "react";
import Stripe from "stripe";
import CheckoutForm from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const ShowcaseDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const showcases = await db
    .select()
    .from(showcaseTable)
    .where(eq(showcaseTable.uuid, id));

  if (showcases == null) return notFound();

  const showcase = showcases[0];

  const tickets = await db
    .select()
    .from(ticketTypesTable)
    .where(eq(ticketTypesTable.showcase, id));

  if (tickets == null) return <h1>No Tickets Found</h1>;

  const ticket = tickets[0];

  console.log("Showcase", showcase);
  console.log("Tickets", tickets);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: ticket.priceInCents,
    currency: "USD",
    metadata: { ticketId: ticket.id, showcaseId: showcase.uuid },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }

  return (
    <CheckoutForm
      showcase={showcase}
      ticket={ticket}
      clientSecret={paymentIntent.client_secret}
    />
  );
};

export default ShowcaseDetailPage;
