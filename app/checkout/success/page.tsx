"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import gsap from "gsap"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { clearCart } = useCart()
  const [orderNumber, setOrderNumber] = useState<string>("")

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clear the cart on successful checkout
    clearCart()

    // Generate a random order number
    setOrderNumber(`ULA-${Math.floor(100000 + Math.random() * 900000)}`)

    // GSAP animations
    const tl = gsap.timeline()

    tl.from(containerRef.current, {
      y: 30,
      opacity: 0,
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
  }, [clearCart])

  return (
    <main className="page-transition">
      <div className="container mx-auto px-4 py-12">
        <div ref={containerRef} className="max-w-2xl mx-auto text-center border rounded-lg p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>

          <p className="text-muted-foreground mb-6">
            Your order has been placed successfully. We've sent a confirmation email with all the details.
          </p>

          <div className="bg-muted p-4 rounded-lg mb-8">
            <p className="font-medium mb-2">Order #{orderNumber}</p>
            <p className="text-sm text-muted-foreground">
              10% of your purchase will be donated to support local arts education programs.
            </p>
            {sessionId && <p className="text-sm text-muted-foreground mt-2">Session ID: {sessionId}</p>}
          </div>

          <Button asChild size="lg">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" /> Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

