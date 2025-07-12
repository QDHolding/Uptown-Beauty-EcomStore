"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import NonProfitBanner from "@/components/non-profit-banner"

export default function AboutPage() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

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
      textRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5",
    )

    tl.from(
      imageRef.current,
      {
        x: 30,
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

  return (
    <main className="page-transition">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 ref={titleRef} className="text-4xl font-bold tracking-tight mb-4">
            Our Story
          </h1>
          <NonProfitBanner />
        </div>

        <div className="l-composition">
          <div ref={textRef} className="l-composition-main">
            <p className="text-lg mb-6">
              Founded in the heart of Los Angeles, Uptown LA Boutique was born from a passion for unique design and a
              commitment to our community.
            </p>
            <p className="mb-6">
              Our boutique brings together the finest designer shirts, handcrafted jewelry, and original artwork from
              local artisans. Each piece in our collection tells a story and represents the vibrant, diverse culture of
              Los Angeles.
            </p>
            <p className="mb-6">
              What sets us apart is our dedication to giving back. We believe in the power of art to transform lives,
              which is why 10% of all our sales go directly to supporting local arts education programs in underserved
              communities.
            </p>
            <p className="mb-6">
              By shopping with us, you're not just acquiring a beautiful, unique piece – you're helping to nurture the
              next generation of artists and designers in our community.
            </p>
          </div>

          <div ref={imageRef} className="l-composition-sidebar">
            <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=800&width=600" alt="Our boutique" fill className="object-cover" />
            </div>
          </div>

          <div className="l-composition-bottom mt-12">
            <h2 className="text-2xl font-bold mb-6">Our Non-Profit Partnership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-3">Arts for All</h3>
                <p className="text-muted-foreground mb-4">
                  We partner with Arts for All, a local non-profit organization dedicated to providing arts education to
                  underserved communities in Los Angeles.
                </p>
                <p className="text-muted-foreground">
                  Through this partnership, we're able to support after-school programs, art supplies for schools, and
                  scholarships for talented young artists.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">Our Impact</h3>
                <p className="text-muted-foreground mb-4">
                  Since our founding, we've contributed over $50,000 to arts education programs, helping to reach more
                  than 1,000 students across Los Angeles.
                </p>
                <p className="text-muted-foreground">
                  We believe that art has the power to transform lives, and we're committed to making that
                  transformation possible for as many young people as we can.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

