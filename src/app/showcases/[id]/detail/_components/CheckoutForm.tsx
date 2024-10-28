"use client";

import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { FormEvent, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import ShowcaseCard from "@/components/ShowcaseCard";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CheckoutFormProps = {
  ticket: {
    id: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  showcase: {
    title: string;
    description: string;
    imageUrl: string;
  };
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutForm = ({
  ticket,
  showcase,
  clientSecret,
}: CheckoutFormProps) => {
  return (
    <>
      <div className="max-w-5xl w-full mx-auto space-y-8">
        <div className=" mx-4 flex gap-4 items-center">
          <div className="aspect-square flex-shrink-0 w-1/3 relative">
            <Image
              src={showcase.imageUrl}
              fill
              alt={showcase.title}
              className="object-cover  rounded-md"
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
          </div>
        </div>
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <Form priceInCents={ticket.priceInCents} ticketId={ticket.id} />
        </Elements>
      </div>
    </>
  );
};

export default CheckoutForm;

function Form({
  priceInCents,
  ticketId,
}: {
  priceInCents: number;
  ticketId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    // Check for existing order
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type == "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "Purchasing..."
              : `            Purchase - ${formatCurrency(priceInCents / 100)}
                `}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
