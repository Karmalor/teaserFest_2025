import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { showcases, ticketTypes } from "@/db/schema";
import { formatCurrency } from "@/lib/formatters";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PaymentSuccess = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (paymentIntent.metadata.ticketId == null) return notFound();

  const ticket = await db.query.ticketTypes.findFirst({
    // with: {
    //   showcase: true,
    // },
    where: eq(ticketTypes.id, paymentIntent.metadata.ticketId),
  });
  if (ticket == undefined) return;

  const showcase = await db.query.showcases.findFirst({
    // with: {
    //   showcase: true,
    // },
    where: eq(showcases.id, paymentIntent.metadata.showcaseId),
  });
  if (showcase == undefined || null) return;

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <>
      <div className="max-w-5xl w-full mx-auto space-y-8">
        <h1 className="text-4xl font-bold">
          {isSuccess ? "Success!" : "Error!"}
        </h1>
        <div className=" mx-4 flex gap-4 items-center">
          <div className="aspect-square flex-shrink-0 w-1/3 relative">
            <Image
              src={showcase.imageUrl}
              fill
              alt={showcase.title}
              className="object-cover rounded-md"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{ticket.name}</h1>
            <h1 className="text-lg">
              {formatCurrency(ticket.priceInCents / 100)}
            </h1>
            <div className="w-1/2 line-clamp-3 text-muted-foreground">
              {ticket.description}
            </div>
            <Button className="mt-4" size="lg" asChild>
              {isSuccess ? (
                <Link href={`/showcases`}>Explore More</Link>
              ) : (
                <Link href={`/showcases/${ticket.showcase}/detail`}>
                  Try Again
                </Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
