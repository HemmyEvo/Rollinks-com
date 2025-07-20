import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    const data = await resend.emails.send({
      from: 'Rollinks <noreply@resend.dev>', // safe for free plan
      to: ['atilolaemmanuel22@email.com'],         // your real email address
      subject: `New message from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: sans-serif;">
          <h2>Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
            }
