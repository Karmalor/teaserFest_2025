"use client";

import {
  AddressElement,
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { createContext, FormEvent, useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SignUp } from "@clerk/nextjs";
import { db } from "@/db";
import { ticketOrders, tickets } from "@/db/schema";
import TicketHolderDetailsForm from "./TicketHolderDetailsForm";

type CheckoutFormProps = {
  ticket: {
    id: string;
    name: string | null;
    priceInCents: number;
    description: string | null;
  };
  showcase: {
    title: string;
    description: string | null;
    imageUrl: string | null;
  };
  clientSecret: string;
  firstName: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutForm = ({
  ticket,
  showcase,
  clientSecret,
  firstName,
}: CheckoutFormProps) => {
  return (
    <>
      <div className="max-w-5xl w-full mx-auto space-y-8">
        <div className=" mx-4 flex gap-4 items-center">
          <div className="aspect-square flex-shrink-0 w-1/3 relative">
            <Image
              src={showcase.imageUrl as string}
              fill
              alt={showcase.title}
              className="object-cover  rounded-md"
            />
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-2xl font-bold">{ticket.name}</h1>
              <h1 className="text-lg">
                {formatCurrency(ticket.priceInCents / 100)}
              </h1>
              <div className="w-1/2 line-clamp-3 text-muted-foreground">
                {ticket.description}
              </div>
            </div>
            {/* <div className="flex flex-col gap-4">
              <Input placeholder="First Name..." />
              <Input placeholder="Last Name..." />
            </div> */}
          </div>
          {/* <div>{!user && <SignUp.Root />}</div> */}
        </div>
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <Form
            priceInCents={ticket.priceInCents}
            ticketId={ticket.id}
            firstName={firstName}
          />
        </Elements>
      </div>
    </>
  );
};

export default CheckoutForm;

function Form({
  priceInCents,
  ticketId,
  firstName,
}: {
  priceInCents: number;
  ticketId: string;
  firstName: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [ticketHolderFirstName, setTicketHolderFirstName] = useState<string>();
  const [ticketHolderLastName, setTicketHolderLastName] = useState<string>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      stripe == null ||
      elements == null ||
      email == null ||
      ticketHolderFirstName == null ||
      ticketHolderLastName == null
    )
      return;

    setIsLoading(true);

    // const NewTicket = await createNewTicket();

    // Check for existing order
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment-success`,
          receipt_email: email,
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
          <h1 className="font-bold mb-2">
            Enter the name for the ticket holder:
          </h1>
          <div className="flex gap-4">
            <TicketHolderDetailsForm firstName={firstName} />

            {/* <div>
              <Label>Last Name</Label>
              <Input
                onChange={(e) => setTicketHolderLastName(e.target.value)}
                placeholder="Last Name..."
              />
            </div> */}
          </div>
          <Separator className="m-4" />
          <PaymentElement
          // options={{
          //   fields: {
          //     billingDetails: {
          //       address: {
          //         city: "never",
          //         postalCode: "never",
          //         country: "never",
          //         state: "never",
          //       },
          //     },
          //   },
          // }}
          />
          {/* <div className="mt-4"> */}

          {/* <Label>Enter the details of the Ticket Holder below:</Label> */}
          {/* <AddressElement
              options={{ mode: "shipping", display: { name: "split" } }}
              onChange={(e) => {
                setFirstName(e.value.firstName);
                setLastName(e.value.lastName);
              }}
              className="mt-4"
            /> */}
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
            // className="mt-2"
          />
          {/* </div> */}
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
