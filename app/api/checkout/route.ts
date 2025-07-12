import { NextResponse } from "next/server"
import type { CartItem, OrderDetails } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const { cartItems, orderDetails } = (await request.json()) as {
      cartItems: CartItem[]
      orderDetails: OrderDetails
    }

    // Validate the request
    if (!cartItems || !cartItems.length || !orderDetails) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    // Calculate order total
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const tax = subtotal * 0.08
    const total = subtotal + tax

    // Calculate donation amount (10% of subtotal)
    const donationAmount = subtotal * 0.1

    // In a real application, you would:
    // 1. Process payment with Stripe or another payment processor
    // 2. Save order to database
    // 3. Send confirmation email
    // 4. Process donation to non-profit

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a random order ID
    const orderId = `ULA-${Math.floor(100000 + Math.random() * 900000)}`

    return NextResponse.json({
      success: true,
      orderId,
      total,
      donationAmount,
      message: "Order processed successfully",
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "An error occurred processing your order" }, { status: 500 })
  }
}

export const runtime = 'edge' // optional
export const dynamic = 'force-dynamic'
export const bodyParser = false
