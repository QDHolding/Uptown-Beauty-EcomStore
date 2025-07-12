"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Loader2 } from "lucide-react"

interface StripeCheckoutButtonProps {
  className?: string
}

export default function StripeCheckoutButton({ className }: StripeCheckoutButtonProps) {
  const { cartItems, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Get the current origin for success/cancel URLs
      const origin = window.location.origin
      const successUrl = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
      const cancelUrl = `${origin}/cart`

      // Create a checkout session
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          successUrl,
          cancelUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else if (data.sessionId) {
        // If we have a sessionId but no URL, we can use Stripe.js to redirect
        // This would require Stripe.js to be loaded
        // stripe.redirectToCheckout({ sessionId: data.sessionId })

        // For simplicity, we'll just show an error
        throw new Error("No checkout URL returned")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={isLoading || cartItems.length === 0} className={className} size="lg">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" /> Secure Checkout
        </>
      )}
    </Button>
  )
}

