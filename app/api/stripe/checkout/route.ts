import { NextResponse } from "next/server"
import Stripe from "stripe"
import type { CartItem } from "@/lib/types"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const { cartItems, successUrl, cancelUrl } = (await request.json()) as {
      cartItems: CartItem[]
      successUrl: string
      cancelUrl: string
    }

    // Validate the request
    if (!cartItems || !cartItems.length || !successUrl || !cancelUrl) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    // Create line items for Stripe
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            productId: item.id,
          },
        },
        unit_amount: Math.round(item.price * 100), // Stripe requires amounts in cents
      },
      quantity: item.quantity,
    }))

    // Add donation line item (10% of subtotal)
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const donationAmount = Math.round(subtotal * 0.1 * 100) // 10% of subtotal in cents

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Donation to Arts Education",
          description: "10% of your purchase goes to supporting local arts education",
        },
        unit_amount: donationAmount,
      },
      quantity: 1,
    })

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        donationAmount: donationAmount.toString(),
      },
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "An error occurred processing your payment" }, { status: 500 })
  }
}

