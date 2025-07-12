"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, Sparkles, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import ProductCard from "@/components/product-card"
import NonProfitBanner from "@/components/non-profit-banner"
import { products } from "@/lib/products"
import { cn } from "@/lib/utils"
import SignupModal from "@/components/signup-modal"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export default function Home() {
  const { toast } = useToast()
  const [showSignup, setShowSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHoveringButton, setIsHoveringButton] = useState(false)

  const featuredProducts = products.slice(0, 3)
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const subscriptionRef = useRef<HTMLDivElement>(null)
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
    // Create a more dramatic initial animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Initialize scroll animations only after initial animations complete
        initScrollAnimations()
      },
    })

    // Initial dramatic animations
    tl.from(".hero-overlay", {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
    })

    tl.from(
      ".hero-title .char",
      {
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.06,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.8",
    )

    tl.from(
      ".hero-accent",
      {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.4",
    )

    tl.to(
      ".hero-tagline",
      {
        duration: 1.5,
        text: {
          value: "UNLEASH YOUR STYLE. EMBRACE THE EXTRAORDINARY.",
          delimiter: "",
        },
        ease: "none",
      },
      "-=0.2",
    )

    tl.from(
      ".hero-cta",
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.8",
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

    // Handle scroll detection for animations
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasScrolled])

  // Initialize scroll-based animations - these will only run after initial load
  const initScrollAnimations = () => {
    if (typeof window === "undefined") return

    // Products section with staggered, dramatic entrances
    ScrollTrigger.create({
      trigger: productsRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.from(".product-card", {
          y: 100,
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          rotation: () => Math.random() * 10 - 5,
        })
      },
      once: true,
    })

    // Subscription box section with dramatic reveal
    ScrollTrigger.create({
      trigger: subscriptionRef.current,
      start: "top 70%",
      onEnter: () => {
        const tl = gsap.timeline()

        tl.from(".subscription-title", {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        })

        tl.from(
          ".subscription-accent",
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.4",
        )

        tl.from(
          ".subscription-content",
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )

        tl.from(
          ".subscription-image",
          {
            x: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )

        tl.from(
          ".feature-item",
          {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
      },
      once: true,
    })

    // Create random confetti burst every few seconds
    const createConfettiBurst = () => {
      const confettiContainer = document.querySelector(".confetti-container")
      if (!confettiContainer) return

      const colors = ["#FF3366", "#FF9933", "#FFFF66", "#33FF99", "#33CCFF", "#CC66FF"]

      for (let i = 0; i < 20; i++) {
        const confetti = document.createElement("div")
        confetti.className = "confetti-piece"
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.left = `${Math.random() * 100}%`

        confettiContainer.appendChild(confetti)

        gsap.to(confetti, {
          y: `${300 + Math.random() * 300}`,
          x: `${Math.random() * 200 - 100}`,
          rotation: `${Math.random() * 360}`,
          opacity: 0,
          duration: 1.5 + Math.random() * 2,
          ease: "power1.out",
          onComplete: () => {
            confetti.remove()
          },
        })
      }

      // Schedule next burst
      setTimeout(createConfettiBurst, 4000 + Math.random() * 4000)
    }

    // Start confetti bursts
    setTimeout(createConfettiBurst, 2000)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "YOU'RE IN! 🎉",
        description: "Get ready for an EPIC style journey!",
      })
      setEmail("")

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

      // Show signup modal after successful subscription
      setTimeout(() => setShowSignup(true), 1000)
    }, 1000)
  }

  const handleSignupClose = () => {
    setShowSignup(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-black text-white overflow-hidden">
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

      {/* Hero Section with Bold Styling */}
      <div ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Background video with vibrant overlay */}
        <div className="absolute inset-0 z-0">
          <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-[#FF3366]/80 to-[#9933FF]/80 z-10"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110"
            poster="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
            src="/Boutiquevid1.mp4"
          />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-[#FF3366]/30 backdrop-blur-md floating-element"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-[#9933FF]/30 backdrop-blur-md floating-element"></div>
        <div className="absolute top-1/3 right-1/5 w-12 h-12 rounded-full bg-[#33CCFF]/30 backdrop-blur-md floating-element"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-[#FFFF66]/30 backdrop-blur-md floating-element"></div>

        {/* Animated shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-40 h-40 opacity-20 floating-element"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
                transform: `scale(${0.5 + Math.random() * 2})`,
              }}
            ></div>
          ))}
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-4 relative z-10">
          <div ref={textRef} className="max-w-4xl mx-auto text-center">
            <h1 className="hero-title text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none">
              <span className="block overflow-hidden">
                <span className="inline-block char">U</span>
                <span className="inline-block char">P</span>
                <span className="inline-block char">T</span>
                <span className="inline-block char">O</span>
                <span className="inline-block char">W</span>
                <span className="inline-block char">N</span>
              </span>
              <span className="block overflow-hidden mt-2">
                <span className="inline-block char">V</span>
                <span className="inline-block char">I</span>
                <span className="inline-block char">B</span>
                <span className="inline-block char">E</span>
                <span className="inline-block char">S</span>
                <span className="hero-accent inline-block ml-2 text-[#FFFF66]">
                  <Zap className="h-12 w-12 md:h-16 md:w-16 inline" />
                </span>
              </span>
            </h1>
            <p className="hero-tagline text-2xl md:text-3xl mb-10 h-16 font-bold tracking-wide">
              {/* Text will be filled by GSAP */}
            </p>

            <div ref={ctaRef} className="hero-cta space-y-8">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FF3366] hover:bg-[#FF3366]/90 text-white text-lg px-10 py-8 rounded-full shadow-[0_0_20px_rgba(255,51,102,0.6)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,51,102,0.8)] hover:scale-105"
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  <Link href="/products">
                    SHOP NOW <Zap className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-[#33CCFF] text-[#33CCFF] hover:bg-[#33CCFF]/10 text-lg px-10 py-8 rounded-full transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  <Link href="/lookbook">
                    LOOKBOOK <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                  className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  <span className="text-sm uppercase tracking-widest mb-2 font-bold">Scroll For More</span>
                  <ChevronDown className="h-6 w-6 animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Surprise element - appears after scrolling */}
        {hasScrolled && (
          <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-right duration-500">
            <div className="bg-white rounded-full p-1 shadow-[0_0_20px_rgba(255,255,255,0.6)]">
              <Button
                onClick={() => setShowSignup(true)}
                size="lg"
                className="rounded-full bg-[#9933FF] hover:bg-[#9933FF]/90 text-white group transition-all duration-300 hover:scale-110"
                onMouseEnter={() => setIsHoveringButton(true)}
                onMouseLeave={() => setIsHoveringButton(false)}
              >
                <span className="mr-2 font-bold">JOIN NOW</span>
                <Sparkles className="h-5 w-5 transition-transform group-hover:scale-125" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Featured Collection with Bold Styling */}
      <section
        ref={productsRef}
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #000000, #1a0033)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center bg-[#FF3366]/20 rounded-full px-6 py-2 text-[#FF3366] font-bold text-lg mb-6">
              <Star className="h-5 w-5 mr-2 fill-[#FF3366]" />
              <span>FEATURED COLLECTION</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 relative">
              STATEMENT PIECES
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#33CCFF]"></div>
            </h2>

            <p className="text-xl text-white/80 max-w-[700px] mb-10">
              Bold designs that demand attention. Express yourself without saying a word.
            </p>

            <NonProfitBanner />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="product-card"
                style={{ transform: `rotate(${index % 2 === 0 ? "2deg" : "-2deg"})` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#33CCFF] hover:bg-[#33CCFF]/90 text-black font-bold text-lg px-10 py-7 rounded-full shadow-[0_0_20px_rgba(51,204,255,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(51,204,255,0.6)] hover:scale-105"
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
            >
              <Link href="/products">
                VIEW ALL PRODUCTS <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Self-Love Subscription Box Section with Bold Styling */}
      <section
        ref={subscriptionRef}
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #1a0033, #330033)" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="subscription-content">
              <div className="inline-flex items-center bg-[#FFFF66]/20 rounded-full px-6 py-2 text-[#FFFF66] font-bold text-lg mb-6">
                <Sparkles className="h-5 w-5 mr-2" />
                <span>NEW SUBSCRIPTION</span>
              </div>

              <h2 className="subscription-title text-4xl md:text-6xl font-black mb-8 leading-tight">
                THE BOSS LADY
                <br />
                <span className="text-[#FF3366]">POWER BOX</span>
                <span className="subscription-accent inline-block ml-3">
                  <Zap className="h-10 w-10 text-[#FFFF66]" />
                </span>
              </h2>

              <p className="text-xl text-white/80 mb-10 max-w-xl">
                Monthly doses of BOLD style and self-expression delivered straight to your door. Curated for the woman
                who refuses to be ignored.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="feature-item bg-white/5 backdrop-blur-sm rounded-xl p-5 transform transition-transform duration-300 hover:scale-105 hover:bg-white/10">
                  <div className="text-[#FF3366] mb-3">
                    <Star className="h-6 w-6 fill-[#FF3366]" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">PREMIUM PRODUCTS</h3>
                  <p className="text-white/70">Luxury items worth over $200</p>
                </div>

                <div className="feature-item bg-white/5 backdrop-blur-sm rounded-xl p-5 transform transition-transform duration-300 hover:scale-105 hover:bg-white/10">
                  <div className="text-[#33CCFF] mb-3">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">BOLD STATEMENT PIECES</h3>
                  <p className="text-white/70">Stand out from the crowd</p>
                </div>

                <div className="feature-item bg-white/5 backdrop-blur-sm rounded-xl p-5 transform transition-transform duration-300 hover:scale-105 hover:bg-white/10">
                  <div className="text-[#FFFF66] mb-3">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">MONTHLY SURPRISE</h3>
                  <p className="text-white/70">New themes every month</p>
                </div>

                <div className="feature-item bg-white/5 backdrop-blur-sm rounded-xl p-5 transform transition-transform duration-300 hover:scale-105 hover:bg-white/10">
                  <div className="text-[#FF9933] mb-3">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">CANCEL ANYTIME</h3>
                  <p className="text-white/70">No commitment required</p>
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md">
                <Input
                  type="email"
                  placeholder="YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-14 rounded-full px-6"
                />
                <Button
                  type="submit"
                  className="bg-[#FF3366] hover:bg-[#FF3366]/90 text-white font-bold h-14 rounded-full px-8 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,51,102,0.4)]"
                  disabled={isLoading}
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  {isLoading ? "SUBSCRIBING..." : "GET STARTED"}
                </Button>
              </form>
            </div>

            <div className="subscription-image relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,51,102,0.3)]">
                <Image
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
                  alt="Boss Lady Power Box"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#330033]/90 to-transparent"></div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-[#9933FF] rounded-2xl p-6 shadow-[0_0_20px_rgba(153,51,255,0.5)] max-w-[220px] transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center mb-3">
                  <div className="flex -space-x-2 mr-3">
                    <div className="w-8 h-8 rounded-full bg-[#FF3366] flex items-center justify-center text-white text-xs font-bold">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#33CCFF] flex items-center justify-center text-white text-xs font-bold">
                      SM
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#FFFF66] flex items-center justify-center text-black text-xs font-bold">
                      KL
                    </div>
                  </div>
                  <div className="text-sm font-bold">500+ SUBSCRIBERS</div>
                </div>
                <div className="text-sm text-white/90 font-medium">"This box is my monthly dose of CONFIDENCE!"</div>
              </div>

              <div className="absolute -top-6 -right-6 bg-[#FF3366] text-white rounded-full p-4 shadow-[0_0_20px_rgba(255,51,102,0.5)] transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="text-xl font-black">$89/mo</div>
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md rounded-full p-6 w-32 h-32 flex items-center justify-center">
                <Button
                  asChild
                  className="rounded-full bg-white text-black font-bold w-full h-full flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300"
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  <Link href="/subscription">
                    <span className="text-xs">GET YOUR</span>
                    <span className="text-lg">BOX</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-[#FF3366]/20 backdrop-blur-md floating-element"></div>
        <div className="absolute bottom-1/3 left-1/5 w-40 h-40 rounded-full bg-[#9933FF]/20 backdrop-blur-md floating-element"></div>
        <div className="absolute top-2/3 right-1/3 w-24 h-24 rounded-full bg-[#FFFF66]/20 backdrop-blur-md floating-element"></div>
      </section>

      {/* Our Story Section with Bold Styling */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #330033, #000000)" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center bg-[#33CCFF]/20 rounded-full px-6 py-2 text-[#33CCFF] font-bold text-lg mb-6">
                <Zap className="h-5 w-5 mr-2" />
                <span>OUR STORY</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                BORN TO <span className="text-[#33CCFF]">STAND OUT</span>
              </h2>

              <p className="text-xl text-white/80 mb-6">
                Founded by rebels who refused to blend in, our boutique brings together the most daring designer shirts,
                statement jewelry, and bold artwork from visionary creators.
              </p>

              <p className="text-xl text-white/80 mb-10">
                We're committed to empowering self-expression, with 10% of all sales donated to support arts programs
                for underserved youth.
              </p>

              <Button
                asChild
                variant="outline"
                className="border-[#33CCFF] text-[#33CCFF] hover:bg-[#33CCFF]/10 font-bold text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHoveringButton(true)}
                onMouseLeave={() => setIsHoveringButton(false)}
              >
                <Link href="/about">
                  OUR FULL STORY <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="order-1 md:order-2 relative">
              <div className="relative h-[500px] bg-gradient-to-br from-[#FF3366]/20 to-[#9933FF]/20 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(153,51,255,0.3)]">
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-20 h-1 bg-white/30 floating-element"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        transform: `rotate(${Math.random() * 180}deg)`,
                      }}
                    ></div>
                  ))}
                </div>
                <span className="text-5xl text-white font-black italic z-10 transform -rotate-6">UPTOWN VIBES</span>
              </div>

              <div className="absolute -bottom-8 -right-8 bg-[#FF3366] rounded-2xl p-6 shadow-[0_0_20px_rgba(255,51,102,0.5)] max-w-[220px] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="text-lg font-bold mb-2">EST. 2023</div>
                <div className="text-sm text-white/90">"Fashion should be a statement, not a question."</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Modal */}
      {showSignup && <SignupModal onClose={handleSignupClose} />}

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

