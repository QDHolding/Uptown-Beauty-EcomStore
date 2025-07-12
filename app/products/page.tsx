"use client"

import { useEffect, useRef } from "react"
import { products } from "@/lib/products"
import ProductCard from "@/components/product-card"
import NonProfitBanner from "@/components/non-profit-banner"
import gsap from "gsap"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductsPage() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline()

    tl.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    if (containerRef.current) {
      const productCards = containerRef.current.querySelectorAll(".product-card")
      tl.from(
        productCards,
        {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )
    }

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
          <h1 ref={headingRef} className="text-4xl font-bold tracking-tight mb-4">
            Our Collection
          </h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto mb-8">
            Explore our curated selection of designer shirts, personalized jewelry, and unique art pieces.
          </p>
          <NonProfitBanner />
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col">
              <ProductCard key={product.id} product={product} />
              <Button variant="link" className="self-end mt-2 text-primary" asChild>
                <Link href={`/products/feature/${product.id}`}>View Featured Details</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

