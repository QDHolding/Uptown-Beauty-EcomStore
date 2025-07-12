"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import StripeCheckoutButton from "@/components/stripe-checkout-button"
import gsap from "gsap"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart()

  const titleRef = useRef<HTMLHeadingElement>(null)
  const cartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline()

    tl.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(
      cartRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5",
    )

    // Add loaded class for page transition
    const pageElement = document.querySelector(".page-transition")
    if (pageElement) {
      pageElement.classList.add("loaded")
    }

    return () => {
      tl.kill()
    }
  }, [])

  const handleIncrement = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1)
  }

  const handleDecrement = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1)
    }
  }

  return (
    <main className="page-transition">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 ref={titleRef} className="text-4xl font-bold tracking-tight mb-4">
            Your Cart
          </h1>
        </div>

        <div ref={cartRef}>
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Button asChild size="lg">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4 border-b">
                    <h2 className="font-medium">Cart Items ({cartItems.length})</h2>
                  </div>

                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 flex items-center">
                        <div className="w-20 h-20 relative flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>

                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-muted-foreground mb-2">${item.price.toFixed(2)}</div>

                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDecrement(item.id, item.quantity)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleIncrement(item.id, item.quantity)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="ml-4 text-right">
                          <div className="font-medium mb-2">${(item.price * item.quantity).toFixed(2)}</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/products">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4 border-b">
                    <h2 className="font-medium">Order Summary</h2>
                  </div>

                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Donation (10%)</span>
                        <span>${(subtotal * 0.1).toFixed(2)}</span>
                      </div>

                      <div className="border-t my-4 pt-4">
                        <div className="flex justify-between font-medium text-lg">
                          <span>Estimated Total</span>
                          <span>${(subtotal * 1.1).toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          10% of your purchase will be donated to support local arts education
                        </div>
                      </div>

                      <StripeCheckoutButton className="w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

