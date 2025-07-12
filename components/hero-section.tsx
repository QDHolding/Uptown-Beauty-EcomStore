"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline()

    tl.from(heroRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })

    tl.from(
      titleRef.current,
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5",
    )

    tl.from(
      subtitleRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6",
    )

    tl.from(
      buttonRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4",
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

  return (
    <section ref={heroRef} className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 z-0"></div>
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
          Uptown LA Boutique
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-white max-w-[800px] mx-auto mb-8">
          Designer shirts, personalized jewelry, and unique art pieces with 10% of sales supporting local arts
          education.
        </p>
        <div ref={buttonRef}>
          <Button asChild size="lg">
            <Link href="/products">
              Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

