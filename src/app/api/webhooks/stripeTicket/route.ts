import { Stripe } from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import { createFormSubmission } from '@/lib/actions/application.actions'
import { v4 } from 'uuid'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { ticketTypes, users } from '@/db/schema'
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

        lineItems.data.forEach(async (lineItem, index)=>{
            if(lineItem.description === 'Weekend VIP'){
              for (let index = 0; index < (lineItem.quantity || 1); index++) {
                const element = lineItem.description;
                console.log("Checking", element, index)

                const ticket = {
                  id: v4(),
                  ticketHolder: session.customer_details?.email,
                  firstName: session.custom_fields[0].text?.value,
                  lastName: session.custom_fields[0].text?.value,
                  isComp: false,
                  isCheckedIn: false
              }
          
              console.log("Ticket", index, ticket)
          
              const newUser = await createTicket(ticket)
              }
            }
           })

        let purchasedProducts = [];

        for (let element of lineItems.data) {
          let item = storeItems.find((i) => i.name === element.description);
          purchasedProducts.push({
            price_data: {
              currency: "usd",
              unit_amount: item!.price,
              product_data: {
                name: item!.name,
                images: [item!.imgUrl],
              },
            },
            quantity: element.quantity,
            name: item?.name,
            price: item?.price,
            description: item?.description,
            imgUrl: item?.imgUrl,
          });
        }

        

        console.log("These are the Line Items part 2", purchasedProducts)

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