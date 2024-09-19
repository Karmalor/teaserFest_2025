import {Resend} from 'resend'
import { NextResponse } from 'next/server';

import KoalaWelcomeEmail from '@/emails/welcome'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    const { firstName, email } = await request.json()

    await resend.emails.send({
        from: 'info@teaserfest.com',
        to: email,
        subject: 'Thank you for your submission',
        react: KoalaWelcomeEmail({userFirstname: firstName})
      });

      return NextResponse.json({
        status: 'Ok'
      })
}