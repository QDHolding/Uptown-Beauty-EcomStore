import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = headers().get("stripe-signature") || ""

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session

        // Here you would typically:
        // 1. Save the order to your database
        // 2. Send confirmation email
        // 3. Update inventory
        // 4. Process the donation

        console.log(`Payment succeeded for session: ${session.id}`)

        // For this example, we'll just log the success
        break

      case "payment_intent.payment_failed":
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`Payment failed for intent: ${paymentIntent.id}`)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "An error occurred processing the webhook" }, { status: 500 })
  }
}


export const dynamic = 'auto'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'