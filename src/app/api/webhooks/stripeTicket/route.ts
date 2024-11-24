import { Stripe } from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import { createFormSubmission } from '@/lib/actions/application.actions'
import { v4 } from 'uuid'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { SelectTicket, tickets, ticketTypes, users } from '@/db/schema'
import { metadata } from '@/app/layout'
import storeItems from "../../../../db/items.json";
import { createTicket } from '@/lib/actions/ticket.actions'


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

      if(eventType === "checkout.session.completed"){
        const session = event.data.object

        if(session.payment_status !== 'paid'){
          return
        }

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
        
        console.log("These are the Line Items",lineItems)

        if(!lineItems) return

        // let promisesToAwait:any[] = [];
        // Initialize `newTickets` as an empty array
let newTickets: Array<SelectTicket> = [];

lineItems.data.map((lineItem) => {
        for (let i = 0; i < (lineItem.quantity || 1); i++) {
            newTickets.push({
                id: v4(),
                ticketType: lineItem.description,
                ticketHolder: session.customer_details!.email,
                firstName: session.custom_fields[0].text!.value,
                lastName: session.custom_fields[1].text!.value,
                isComp: false,
                isCheckedIn: false,
                createdAt: new Date()
            });
        }
});

console.log("Added to array", newTickets)
// Call `createTicket` with the array
const addedTickets = await db.insert(tickets).values(newTickets)

await fetch("/api/receiptEmail", {
  method: "POST",
  body: JSON.stringify({
    email: session.customer_details!.email,
    checkoutSession: session,
    purchasedProducts: {...lineItems.data}
  }),
});

  // await resend.email.send({
  //   from: 'info@teaserfest.com',
  //   to: session.customer_details!.email,
  //   subject: "Teaser Fest 2025Order Confirmation",
  //   react: 
  // })

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