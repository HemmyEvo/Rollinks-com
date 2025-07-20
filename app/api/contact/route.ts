import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Received body:', body)

    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 })
    }

    const data = await resend.emails.send({
      from: 'Rollinks <onboarding@resend.dev>', // using resend.dev if no domain
      to: ['your@email.com'], // your actual email here
      subject: `New message from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px;">
          <h2>📩 Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        </div>
      `
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}