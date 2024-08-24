import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import { useUser } from '@clerk/nextjs'


export async function POST(request: Request) {
    const {user} = useUser()
    const body = await request.text()
  
    const sig = request.headers.get('stripe-signature') as string
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
  
    let event
  
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err) {
      return NextResponse.json({ message: 'Webhook error', error: err })
    }
  
    // Get the ID and type
    const eventType = event.type
  
    // CREATE
    if (eventType === 'payment_intent.succeeded') {
      const { id, amount, metadata} = event.data.object
   console.log(event.data.object)

      const order = {
        stripeId: id,
        buyerId: user?.id || '',
        totalAmount: amount ? (amount / 100).toString() : '0',
        applicationSubmitted: false,
      }

      console.log(order)
  
    //   const newOrder = await createOrder(order)
    //   return NextResponse.json({ message: 'OK', order: newOrder })
    }
  
    return new Response('', { status: 200 })
  }