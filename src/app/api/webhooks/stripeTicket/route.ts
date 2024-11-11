import { Stripe } from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import { createFormSubmission } from '@/lib/actions/application.actions'
import { v4 } from 'uuid'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { ticketTypes, users } from '@/db/schema'
import { metadata } from '@/app/layout'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, 
  {
    stripeAccount: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID as string,
  }
)


export async function POST(req: Request) {

      let event
  
    try {
      event = stripe.webhooks.constructEvent(
        await req.text(), 
        req.headers.get('stripe-signature') as string, 
        process.env.STRIPE_WEBHOOK_SECRET as string)
    } catch (err) {
      return NextResponse.json({ message: 'Webhook error', error: err })
    }
  
      const eventType = event.type

      if(eventType === "checkout.session.async_payment_succeeded"){
        const session = event.data.object
        const lineItems = session.line_items

        console.log(lineItems)

      }

    // if(eventType === "charge.succeeded"){
      

    //   const charge = event.data.object
    //   const paymentIntent =charge.payment_intent
    //   const productId = charge.metadata.productId
    //   const email = charge.billing_details.email
    //   const pricePaidInCents = charge.amount
    //   const appFee = charge.application_fee_amount
    //   const ticketHolderFirstName = charge.metadata.ticketHolderFirstName
    //   const ticketHolderLastName = charge.metadata.ticketHolderLastName
    //   const products = charge.payment_intent
    //   const lineItems = await stripe.paymentIntents.retrieve(paymentIntent as string)
    //   lineItems.
    // }

  //   .forEach((val, index)=>{
      
  //  });
    
    return new Response('', { status: 200 })

  }