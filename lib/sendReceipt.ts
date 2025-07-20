import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error('Missing RESEND_API_KEY in environment variables');
 console.log(resendApiKey)
}
const resend = new Resend(process.env.RESEND_API_KEY)

interface Item {
  name: string;
  quantity: number;
  price: number;
}

export async function sendReceipt({
  name,
  email,
  items,
  total,
  shipping,
  orderId,
  paymentMethod,
}: {
  name: string;
  email: string;
  items: Item[];
  total: number;
  shipping: number;
  orderId: string;
  paymentMethod: string;
}) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto;">
      <h2 style="color: #10B981;">🧾 Receipt for Order #${orderId}</h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>Thank you for shopping with <strong>Rollinks</strong>! Here is your order summary:</p>

      <ul style="padding-left: 16px;">
        ${items.map(item => `
          <li>${item.name} (Qty: ${item.quantity}) – ₦${(item.price * item.quantity).toLocaleString()}</li>
        `).join('')}
      </ul>

      <p><strong>Subtotal:</strong> ₦${(total - shipping).toLocaleString()}</p>
      <p><strong>Shipping:</strong> ₦${shipping.toLocaleString()}</p>
      <p><strong>Total Paid:</strong> <span style="color: #10B981;">₦${total.toLocaleString()}</span></p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>

      <br/>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://rollinks-com.vercel.app/history" style="
          background-color: #10B981;
          color: white;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 6px;
          font-weight: bold;
          display: inline-block;
        ">🧭 View Your Order History</a>
      </div>

      <p>If you have any questions, feel free to reply to this email or reach us on WhatsApp at <a href="https://wa.me/2347053142223">07053142223</a>.</p>

      <p style="margin-top: 40px;">— The <strong>Rollinks</strong> Team</p>
    </div>
  `;

  return await resend.emails.send({
    from: 'Rollinks <onboarding@resend.dev>',
    to: email,
    subject: `🧾 Your Rollinks Receipt – Order #${orderId}`,
    html: htmlContent,
  });
}