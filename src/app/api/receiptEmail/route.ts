import {Resend} from 'resend'
import { NextResponse } from 'next/server';

import KoalaWelcomeEmail from '@/emails/welcome'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    const { ticketHolderFirstName, ticketHolderLastName, email } = await request.json()

    await resend.emails.send({
        from: 'info@teaserfest.com',
        to: email,
        subject: 'Thank you for your submission',
        react: KoalaWelcomeEmail({userFirstname: ticketHolderFirstName})
      });

      return NextResponse.json({
        status: 'Ok'
      })
}