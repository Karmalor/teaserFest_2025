import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import { createFormSubmission } from '@/lib/actions/application.actions'


export async function POST(request: Request) {
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

      const order = {
        stripeId: id,
        buyerId: metadata?.buyerId || '',
        amount: amount ? (amount / 100).toString() : '0',
        applicationSubmitted: false,
      }

      const application = {
        applicant: metadata?.applicant || '',
        stageName: "",
        tagline: "",
        applicationSubmitted: false,
      }

      console.log(order)
      console.log(application)
  
      const newOrder = await createOrder(order)
      const newApplication = await createFormSubmission(application)
      return NextResponse.json({ message: 'OK', order: newOrder, application: newApplication })
    }
  
    return new Response('', { status: 200 })
  }