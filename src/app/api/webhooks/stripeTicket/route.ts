import { Stripe } from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import { createFormSubmission } from '@/lib/actions/application.actions'
import { v4 } from 'uuid'
import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { ticketTypes, users } from '@/db/schema'
import { metadata } from '@/app/layout'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)


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

      console.log(event)

    if(eventType === "charge.succeeded"){
      const charge = event.data.object
      const productId = charge.metadata.productId
      const email = charge.billing_details.email
      const pricePaidInCents = charge.amount
      const appFee = charge.application_fee_amount
      const ticketHolderFirstName = charge.metadata.ticketHolderFirstName
      const ticketHolderLastName = charge.metadata.ticketHolderLastName
    }
  }