import { metadata } from "@/app/layout";
import { CreateOrderParams } from "@/types";
import { useUser } from "@clerk/nextjs";
import { currentUser, User } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

 export async function POST(request: NextRequest) {

  try {
    const { amount } = await request.json();
    const user = await currentUser()

    const paymentIntent = await stripe.paymentIntents.create({

      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        buyerId: user?.id,
        applicant: user?.primaryEmailAddress?.emailAddress
      }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}