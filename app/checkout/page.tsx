"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import StripeCheckoutButton from "@/components/stripe-checkout-button"
import gsap from "gsap"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems } = useCart()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      router.push("/cart")
      return
    }

    // GSAP animations
    const tl = gsap.timeline()

    tl.from(containerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    })

    // Add loaded class for page transition
    const pageElement = document.querySelector(".page-transition")
    if (pageElement) {
      pageElement.classList.add("loaded")
    }

    return () => {
      tl.kill()
    }
  }, [cartItems.length, router])

  if (cartItems.length === 0) return null

  return (
    <main className="page-transition">
      <div className="container mx-auto px-4 py-12">
        <div ref={containerRef} className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Secure Checkout</h1>
            <p className="text-muted-foreground">
              We're redirecting you to our secure payment processor to complete your purchase.
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-8 border shadow-sm">
            <div className="text-center mb-8">
              <p className="mb-4">Click the button below to proceed to our secure payment page powered by Stripe.</p>
              <p className="text-sm text-muted-foreground mb-8">
                Your payment information is encrypted and secure. We never store your card details.
              </p>

              <StripeCheckoutButton className="w-full max-w-md mx-auto" />
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/cart">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Return to Cart
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              By proceeding with your purchase, you agree to our Terms of Service and Privacy Policy. 10% of your
              purchase will be donated to support local arts education.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

