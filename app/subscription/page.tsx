"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Sparkles, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import gsap from "gsap"
import { cn } from "@/lib/utils"

interface PlanOption {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  popular?: boolean
  color: string
}

const plans: PlanOption[] = [
  {
    id: "monthly",
    name: "MONTHLY",
    price: 89,
    description: "Perfect for trying out our subscription",
    features: ["Premium self-care products", "Statement jewelry piece", "Exclusive digital content", "Cancel anytime"],
    color: "#33CCFF",
  },
  {
    id: "quarterly",
    name: "QUARTERLY",
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
    color: "#FF3366",
  },
  {
    id: "annual",
    name: "ANNUAL",
    price: 69,
    description: "Best value for committed subscribers",
    features: [
      "Everything in Quarterly",
      "Two bonus luxury items",
      "Personalized curation",
      "25% off regular store items",
      "Exclusive annual gift",
    ],
    color: "#FFFF66",
  },
]

export default function SubscriptionPage() {
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState<string>("quarterly")
  const [isLoading, setIsLoading] = useState(false)
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const pageRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Update custom cursor position
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: cursorPosition.x,
        y: cursorPosition.y,
        duration: 0.2,
        ease: "power2.out",
      })
    }
  }, [cursorPosition])

  useEffect(() => {
    // Bold page load animation
    const tl = gsap.timeline()

    tl.from(".page-title .char", {
      opacity: 0,
      y: 100,
      rotationX: -90,
      stagger: 0.06,
      duration: 0.8,
      ease: "back.out(1.7)",
    })

    tl.from(
      ".page-subtitle",
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    )

    tl.from(
      ".subscription-container",
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    )

    tl.from(
      ".plan-card",
      {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4",
    )

    // Random floating elements animation
    const floatingElements = document.querySelectorAll(".floating-element")
    floatingElements.forEach((el) => {
      gsap.to(el, {
        y: `random(-20, 20)`,
        x: `random(-20, 20)`,
        rotation: `random(-15, 15)`,
        duration: `random(2, 4)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: `random(0, 2)`,
      })
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "SUBSCRIPTION CONFIRMED! 🎉",
        description: "Your first POWER BOX will ship soon!",
      })

      // Create confetti celebration
      const confettiContainer = document.querySelector(".confetti-container")
      if (confettiContainer) {
        const colors = ["#FF3366", "#FF9933", "#FFFF66", "#33FF99", "#33CCFF", "#CC66FF"]

        for (let i = 0; i < 50; i++) {
          const confetti = document.createElement("div")
          confetti.className = "confetti-piece"
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
          confetti.style.left = `${Math.random() * 100}%`

          confettiContainer.appendChild(confetti)

          gsap.to(confetti, {
            y: `${300 + Math.random() * 500}`,
            x: `${Math.random() * 400 - 200}`,
            rotation: `${Math.random() * 720 - 360}`,
            opacity: 0,
            duration: 2 + Math.random() * 3,
            ease: "power1.out",
            onComplete: () => {
              confetti.remove()
            },
          })
        }
      }
    }, 1500)
  }

  return (
    <main
      ref={pageRef}
      className="page-transition min-h-screen bg-black text-white overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #000000, #1a0033, #330033)" }}
    >
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-300",
          isHoveringButton ? "scale-[3] bg-white" : "bg-white/50",
        )}
        style={{
          left: -20,
          top: -20,
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        }}
      ></div>

      {/* Confetti container */}
      <div className="confetti-container fixed inset-0 pointer-events-none z-40 overflow-hidden"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-[#FF3366]/20 backdrop-blur-md floating-element"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-[#9933FF]/20 backdrop-blur-md floating-element"></div>
      <div className="absolute top-1/3 right-1/5 w-12 h-12 rounded-full bg-[#33CCFF]/20 backdrop-blur-md floating-element"></div>
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-[#FFFF66]/20 backdrop-blur-md floating-element"></div>

      <div className="container mx-auto px-4 py-16">
        <Button
          variant="ghost"
          className="mb-12 text-white hover:bg-white/10"
          asChild
          onMouseEnter={() => setIsHoveringButton(true)}
          onMouseLeave={() => setIsHoveringButton(false)}
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" /> BACK TO HOME
          </Link>
        </Button>

        <div className="text-center mb-16">
          <h1 className="page-title text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none">
            <span className="inline-block char">B</span>
            <span className="inline-block char">O</span>
            <span className="inline-block char">S</span>
            <span className="inline-block char">S</span>
            <span className="inline-block char">&nbsp;</span>
            <span className="inline-block char">L</span>
            <span className="inline-block char">A</span>
            <span className="inline-block char">D</span>
            <span className="inline-block char">Y</span>
            <span className="inline-block char">&nbsp;</span>
            <span className="inline-block text-[#FF3366] char">P</span>
            <span className="inline-block text-[#FF3366] char">O</span>
            <span className="inline-block text-[#FF3366] char">W</span>
            <span className="inline-block text-[#FF3366] char">E</span>
            <span className="inline-block text-[#FF3366] char">R</span>
            <span className="inline-block char">&nbsp;</span>
            <span className="inline-block char">B</span>
            <span className="inline-block char">O</span>
            <span className="inline-block char">X</span>
            <Zap className="inline-block ml-4 h-12 w-12 text-[#FFFF66]" />
          </h1>

          <p className="page-subtitle text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Monthly doses of BOLD style and self-expression delivered straight to your door. Curated for the woman who
            refuses to be ignored.
          </p>
        </div>

        <div className="subscription-container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className="plan-card"
                style={{ transform: `rotate(${index % 2 === 0 ? "1deg" : "-1deg"})` }}
              >
                <div
                  className={cn(
                    "bg-white/5 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 h-full",
                    selectedPlan === plan.id
                      ? `border-[${plan.color}] shadow-[0_0_30px_rgba(${plan.color.replace("#", "")},0.2)]`
                      : "border-white/10 hover:border-white/30",
                  )}
                >
                  <div
                    className="p-6 border-b border-white/10"
                    style={{
                      background:
                        selectedPlan === plan.id
                          ? `linear-gradient(to bottom right, ${plan.color}20, transparent)`
                          : undefined,
                    }}
                  >
                    {plan.popular && (
                      <div className="inline-flex items-center bg-[#FF3366] rounded-full px-4 py-1 text-white font-bold text-sm mb-4">
                        <Star className="h-3 w-3 mr-1 fill-white" />
                        <span>MOST POPULAR</span>
                      </div>
                    )}

                    <h3 className="text-2xl font-black mb-2" style={{ color: plan.color }}>
                      {plan.name}
                    </h3>

                    <p className="text-white/70 mb-4">{plan.description}</p>

                    <div className="flex items-baseline">
                      <span className="text-4xl font-black">${plan.price}</span>
                      <span className="text-white/70 ml-1">/month</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                      <div className="flex items-center mb-6">
                        <RadioGroupItem
                          id={`plan-${plan.id}`}
                          value={plan.id}
                          className="mr-3"
                          style={{
                            borderColor: selectedPlan === plan.id ? plan.color : undefined,
                            backgroundColor: selectedPlan === plan.id ? plan.color : undefined,
                          }}
                        />
                        <Label htmlFor={`plan-${plan.id}`} className="font-bold cursor-pointer">
                          SELECT THIS PLAN
                        </Label>
                      </div>
                    </RadioGroup>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div style={{ color: plan.color }}>
                            <Check className="h-5 w-5" />
                          </div>
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={cn(
                        "w-full font-bold py-6 rounded-xl transition-all duration-300 hover:scale-105",
                        selectedPlan === plan.id ? "bg-white text-black" : `bg-white/10 hover:bg-white/20 text-white`,
                      )}
                      onMouseEnter={() => setIsHoveringButton(true)}
                      onMouseLeave={() => setIsHoveringButton(false)}
                    >
                      {selectedPlan === plan.id ? "SELECTED" : "CHOOSE PLAN"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-8 border-b border-white/10">
              <h3 className="text-3xl font-black mb-4">COMPLETE YOUR SUBSCRIPTION</h3>
              <p className="text-white/70">
                Fill in your details below to get your first Boss Lady Power Box delivered to your door.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-white/80 font-medium">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    required
                    className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-white/80 font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    required
                    className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-white/80 font-medium">
                  Shipping Address
                </Label>
                <Input
                  id="address"
                  required
                  className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white h-12"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="city" className="text-white/80 font-medium">
                    City
                  </Label>
                  <Input
                    id="city"
                    required
                    className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-white/80 font-medium">
                    State
                  </Label>
                  <Input
                    id="state"
                    required
                    className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-white/80 font-medium">
                    ZIP Code
                  </Label>
                  <Input
                    id="zip"
                    required
                    className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white h-12"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-[#FF3366] hover:bg-[#FF3366]/90 text-white font-bold py-7 text-xl rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,51,102,0.3)]"
                  disabled={isLoading}
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2">
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                      PROCESSING...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      SUBSCRIBE NOW <Sparkles className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>

                <p className="text-xs text-center text-white/60 mt-4">
                  By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel your subscription
                  at any time.
                </p>
              </div>
            </form>
          </div>

          <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="text-[#FF3366] mt-1">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">What Our Subscribers Say</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-white/5 rounded-xl p-6">
                    <p className="text-white/80 italic mb-4">
                      "This box is my monthly reminder that I'm a total BOSS. The products are amazing quality and
                      always make me feel powerful and confident!"
                    </p>
                    <div className="font-bold">— Jennifer M., CEO</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6">
                    <p className="text-white/80 italic mb-4">
                      "I've tried many subscription boxes, but this one actually delivers on its promises. Every month
                      I'm blown away by the bold, unique items!"
                    </p>
                    <div className="font-bold">— Samantha K., Creative Director</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 30px;
          top: 0;
          opacity: 1;
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
      `}</style>
    </main>
  )
}

