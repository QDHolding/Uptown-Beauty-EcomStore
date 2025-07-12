"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { HeartHandshake, DollarSign, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import gsap from "gsap"

export default function DonatePage() {
  const { toast } = useToast()
  const [donationAmount, setDonationAmount] = useState<string>("25")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [donationComplete, setDonationComplete] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  }, [])

  const handleDonationAmountChange = (value: string) => {
    setDonationAmount(value)
    if (value !== "custom") {
      setCustomAmount("")
    }
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setCustomAmount(value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get the final donation amount
    const amount = donationAmount === "custom" ? customAmount : donationAmount

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success message
    setDonationComplete(true)

    // Animate success message
    if (successRef.current) {
      gsap.from(successRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })
    }

    toast({
      title: "Thank you for your donation!",
      description: `Your donation of $${amount} will help support local arts education.`,
    })

    setIsSubmitting(false)
  }

  return (
    <main className="page-transition">
      <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <HeartHandshake className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold tracking-tight mb-4">Support Our Cause</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your donation directly supports arts education programs in underserved communities throughout Los
                Angeles.
              </p>
            </div>

            {!donationComplete ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="relative rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?q=80&w=2787&auto=format&fit=crop"
                      alt="Arts education"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="bg-muted rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Your Impact</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>$25 provides art supplies for one student for a month</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>$50 funds a field trip to a local museum for two students</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>$100 provides materials for an entire classroom project</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>$250 sponsors a student for a full semester of after-school arts programs</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">Donation Amount</h2>
                      <RadioGroup
                        value={donationAmount}
                        onValueChange={handleDonationAmountChange}
                        className="grid grid-cols-2 gap-4"
                      >
                        <Label
                          htmlFor="amount-25"
                          className={cn(
                            "flex items-center justify-center border rounded-md p-4 cursor-pointer transition-colors",
                            donationAmount === "25" ? "bg-primary/10 border-primary" : "hover:bg-muted",
                          )}
                        >
                          <RadioGroupItem id="amount-25" value="25" className="sr-only" />
                          <span className="font-medium">$25</span>
                        </Label>
                        <Label
                          htmlFor="amount-50"
                          className={cn(
                            "flex items-center justify-center border rounded-md p-4 cursor-pointer transition-colors",
                            donationAmount === "50" ? "bg-primary/10 border-primary" : "hover:bg-muted",
                          )}
                        >
                          <RadioGroupItem id="amount-50" value="50" className="sr-only" />
                          <span className="font-medium">$50</span>
                        </Label>
                        <Label
                          htmlFor="amount-100"
                          className={cn(
                            "flex items-center justify-center border rounded-md p-4 cursor-pointer transition-colors",
                            donationAmount === "100" ? "bg-primary/10 border-primary" : "hover:bg-muted",
                          )}
                        >
                          <RadioGroupItem id="amount-100" value="100" className="sr-only" />
                          <span className="font-medium">$100</span>
                        </Label>
                        <Label
                          htmlFor="amount-250"
                          className={cn(
                            "flex items-center justify-center border rounded-md p-4 cursor-pointer transition-colors",
                            donationAmount === "250" ? "bg-primary/10 border-primary" : "hover:bg-muted",
                          )}
                        >
                          <RadioGroupItem id="amount-250" value="250" className="sr-only" />
                          <span className="font-medium">$250</span>
                        </Label>
                        <Label
                          htmlFor="amount-custom"
                          className={cn(
                            "flex items-center justify-center border rounded-md p-4 cursor-pointer transition-colors col-span-2",
                            donationAmount === "custom" ? "bg-primary/10 border-primary" : "hover:bg-muted",
                          )}
                        >
                          <RadioGroupItem id="amount-custom" value="custom" className="sr-only" />
                          <span className="font-medium mr-2">Custom Amount:</span>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <Input
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                              onClick={() => handleDonationAmountChange("custom")}
                              className="w-24 h-8"
                              placeholder="0.00"
                            />
                          </div>
                        </Label>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">Your Information</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" name="firstName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" name="lastName" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">Payment Information</h2>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-1">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2 col-span-1">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                        <div className="space-y-2 col-span-1">
                          <Label htmlFor="zip">Zip Code</Label>
                          <Input id="zip" placeholder="90210" required />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea id="message" placeholder="Share why you're supporting our cause..." rows={3} />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting || (donationAmount === "custom" && !customAmount)}
                    >
                      {isSubmitting
                        ? "Processing..."
                        : `Donate $${donationAmount === "custom" ? customAmount || "0.00" : donationAmount}`}
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <div ref={successRef} className="text-center bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Thank You for Your Donation!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Your generosity will make a real difference in the lives of young artists in our community.
                </p>
                <div className="bg-muted p-6 rounded-lg mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    A receipt has been sent to your email address. Your donation may be tax-deductible.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Donation Reference: DON-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>
                <Button asChild size="lg">
                  <a href="/">Return to Homepage</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

