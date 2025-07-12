"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Check, Heart, Package, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface SubscriptionBoxProps {
  className?: string
}

interface PlanOption {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  popular?: boolean
}

const plans: PlanOption[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: 89,
    description: "Perfect for trying out our subscription",
    features: ["Premium self-care products", "Artisan jewelry piece", "Exclusive digital content", "Cancel anytime"],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: 79,
    description: "Our most popular plan",
    features: [
      "Everything in Monthly",
      "Free shipping",
      "Bonus luxury item",
      "Early access to new products",
      "15% off regular store items",
    ],
    popular: true,
  },
  {
    id: "annual",
    name: "Annual",
    price: 69,
    description: "Best value for committed subscribers",
    features: [
      "Everything in Quarterly",
      "Two bonus luxury items",
      "Personalized curation",
      "25% off regular store items",
      "Exclusive annual gift",
    ],
  },
]

export default function SubscriptionBox({ className }: SubscriptionBoxProps) {
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState<string>("quarterly")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Subscription successful!",
        description: "Your first Boss Lady Self-Love Box will ship soon.",
      })
    }, 1500)
  }

  return (
    <div className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#00bfb3]/10 rounded-full px-4 py-1 text-[#00bfb3] font-medium text-sm mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Self-Care Subscription</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Boss Lady <span className="text-[#00bfb3]">Self-Love Box</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            A monthly dose of luxury and self-care delivered to your doorstep. Curated for ambitious women who deserve
            to celebrate their achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="col-span-1 lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-2xl font-bold mb-6">Choose Your Plan</h3>

              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-4">
                {plans.map((plan) => (
                  <Label
                    key={plan.id}
                    htmlFor={`plan-${plan.id}`}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg cursor-pointer transition-all",
                      selectedPlan === plan.id ? "border-[#00bfb3] bg-[#00bfb3]/5" : "hover:border-muted-foreground/50",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <RadioGroupItem id={`plan-${plan.id}`} value={plan.id} className="mt-1" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{plan.name}</span>
                          {plan.popular && (
                            <span className="bg-[#00bfb3] text-white text-xs px-2 py-0.5 rounded-full">Popular</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                        <ul className="mt-2 grid gap-1">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="text-sm flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-[#00bfb3]" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-right">
                      <div className="text-2xl font-bold">${plan.price}</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>

              <form onSubmit={handleSubscribe} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input id="address" required />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" required />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#00bfb3] hover:bg-[#00bfb3]/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Subscribe Now"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel your subscription
                  at any time.
                </p>
              </form>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop"
                  alt="Boss Lady Self-Love Box"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">What's Inside</h3>
                  <p className="text-sm">
                    Each box is uniquely curated with premium self-care products, artisan jewelry, and exclusive items.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00bfb3]/10 flex items-center justify-center text-[#00bfb3]">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Monthly Delivery</h4>
                    <p className="text-sm text-muted-foreground">Arrives between the 1st-5th</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00bfb3]/10 flex items-center justify-center text-[#00bfb3]">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Satisfaction Guaranteed</h4>
                    <p className="text-sm text-muted-foreground">Love it or get your money back</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00bfb3]/10 flex items-center justify-center text-[#00bfb3]">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Flexible Subscription</h4>
                    <p className="text-sm text-muted-foreground">Skip a month or cancel anytime</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#00bfb3]/10 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#00bfb3]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Join 500+ Boss Ladies</h4>
                    <p className="text-sm text-muted-foreground">
                      "This subscription has become my monthly reward for all the hard work I put in. It's like having a
                      personal shopper who knows exactly what I need to feel pampered and appreciated."
                    </p>
                    <div className="mt-2 text-sm font-medium">— Jennifer M., CEO & Subscriber</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

