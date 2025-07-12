"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { toast } = useToast()
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringButton, setIsHoveringButton] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toast({
      title: "ADDED TO CART! 🔥",
      description: `${product.name} has been added to your cart.`,
    })

    // Create mini explosion effect
    const button = e.currentTarget as HTMLButtonElement
    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute w-2 h-2 rounded-full bg-white z-50"
      document.body.appendChild(particle)

      const angle = Math.random() * Math.PI * 2
      const distance = 50 + Math.random() * 50
      const destinationX = x + Math.cos(angle) * distance
      const destinationY = y + Math.sin(angle) * distance

      gsap.fromTo(
        particle,
        {
          x: x,
          y: y,
          opacity: 1,
          scale: 1,
        },
        {
          x: destinationX,
          y: destinationY,
          opacity: 0,
          scale: 0,
          duration: 0.6 + Math.random() * 0.4,
          ease: "power2.out",
          onComplete: () => {
            particle.remove()
          },
        },
      )
    }
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "group block relative rounded-2xl overflow-hidden transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10",
        isHovering ? "shadow-[0_0_30px_rgba(255,51,102,0.3)] scale-[1.02]" : "",
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className={cn("object-cover transition-transform duration-700", isHovering ? "scale-110" : "scale-100")}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300",
            isHovering ? "opacity-70" : "opacity-50",
          )}
        ></div>

        <div className="absolute top-4 left-4">
          <div className="inline-flex items-center bg-[#FF3366] rounded-full px-3 py-1 text-white font-bold text-xs">
            <Star className="h-3 w-3 mr-1 fill-white" />
            <span>HOT ITEM</span>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <div className="inline-flex items-center bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white font-bold text-xs">
            <span>{product.category}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF3366] transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-black">${product.price}</div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-white text-black hover:bg-white/90 rounded-full font-bold transition-all duration-300 group-hover:scale-110"
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            ADD
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-none",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      >
        <Button className="bg-[#FF3366] hover:bg-[#FF3366]/90 text-white font-bold px-6 py-6 rounded-full transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(255,51,102,0.4)]">
          VIEW DETAILS <Zap className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </Link>
  )
}

