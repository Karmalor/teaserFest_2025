import {Resend} from 'resend'
import { NextResponse } from 'next/server';

import { PassReceiptEmail } from '@/emails/passRecept';

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    const { ticketHolderFirstName, ticketHolderLastName, email } = await request.json()

    await resend.emails.send({
        from: 'info@teaserfest.com',
        to: email || "karmalor@gmail.com",
        subject: 'Thank you for your order',

        react: PassReceiptEmail({checkoutSession: {
          status: "suceeded",
          custom_fields: [{
            text: {
              value: "Luka"
            }
          }],
          total_details: {
            amount_discount: 2000,
            amount_tax: 8000
          },
          amount_subtotal: 40000,
          shipping_cost: {
            amount_total: 0,
          },
          amount_total: 48000,
        },
        user: "karmalor@gmail.com",
        purchasedProducts: [{
          imgUrl: "/",
          name: "Thing",
          price: 40000,
          quantity: 1,
          description: "string;"
        }],
        promoCode: {
          code: "VIP20"
        }})
      });

      return NextResponse.json({
        status: 'Ok'
      })
}