"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Heart, HeartHandshake, Play, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"
import gsap from "gsap"

export default function ProductFeaturePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(products.find((p) => p.id === params.id))
  const [isLoaded, setIsLoaded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"details" | "story" | "care">("details")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [rotationDegree, setRotationDegree] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const productImageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rotationInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!product) {
      router.push("/products")
      return
    }

    setIsLoaded(true)

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
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current)
      }
    }
  }, [product, router])

  if (!product || !isLoaded) return null

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })

    // Trigger the surprise rotation effect
    startRotation()
  }

  const startRotation = () => {
    if (isRotating) return

    setIsRotating(true)
    let degree = 0

    rotationInterval.current = setInterval(() => {
      degree += 10
      setRotationDegree(degree)

      if (degree >= 360) {
        if (rotationInterval.current) {
          clearInterval(rotationInterval.current)
        }
        setTimeout(() => {
          setIsRotating(false)
          setRotationDegree(0)
        }, 500)
      }
    }, 20)
  }

  const handleDonateClick = () => {
    toast({
      title: "Thank you for your support!",
      description: "You're being redirected to our donation page.",
    })
  }

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  return (
    <main className="page-transition">
      <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 py-12">
          <Button variant="ghost" className="mb-8" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Product images and video */}
            <div className="space-y-6">
              <div
                ref={productImageRef}
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden transition-all duration-500",
                  isRotating ? "shadow-2xl shadow-primary/30" : "",
                )}
                style={{
                  transform: isRotating ? `rotate(${rotationDegree}deg)` : "rotate(0deg)",
                }}
              >
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

                {/* Video overlay */}
                {isVideoPlaying && (
                  <div className="absolute inset-0 bg-black">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      onEnded={() => setIsVideoPlaying(false)}
                    >
                      <source
                        src="/public/Boutiquevid1.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 rounded-full bg-black/50 text-white hover:bg-black/70"
                      onClick={toggleVideo}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}

                {/* Video play button */}
                {!isVideoPlaying && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 h-16 w-16"
                    onClick={toggleVideo}
                  >
                    <Play className="h-8 w-8" />
                  </Button>
                )}
              </div>

              {/* Product gallery */}
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=2125&auto=format&fit=crop"
                    alt="Product detail"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2664&auto=format&fit=crop"
                    alt="Product detail"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=2835&auto=format&fit=crop"
                    alt="Product detail"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Product details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
                <p className="text-muted-foreground text-lg">{product.description}</p>
              </div>

              <div className="flex items-center">
                <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
                <div className="ml-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  10% goes to charity
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b">
                <div className="flex space-x-8">
                  <button
                    className={cn(
                      "pb-2 font-medium text-sm transition-colors",
                      activeTab === "details"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => setActiveTab("details")}
                  >
                    Details
                  </button>
                  <button
                    className={cn(
                      "pb-2 font-medium text-sm transition-colors",
                      activeTab === "story"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => setActiveTab("story")}
                  >
                    Story
                  </button>
                  <button
                    className={cn(
                      "pb-2 font-medium text-sm transition-colors",
                      activeTab === "care"
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => setActiveTab("care")}
                  >
                    Care
                  </button>
                </div>
              </div>

              {/* Tab content */}
              <div className="min-h-[200px]">
                {activeTab === "details" && (
                  <div className="space-y-4">
                    <p>{product.longDescription}</p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "story" && (
                  <div className="space-y-4">
                    <p>
                      Each {product.name.toLowerCase()} tells a unique story. Designed in our LA studio, this piece
                      represents the vibrant culture and artistic spirit of Los Angeles.
                    </p>
                    <p>
                      Our designers draw inspiration from the diverse neighborhoods, coastal landscapes, and urban
                      architecture that make LA such a creative hub.
                    </p>
                    <p>
                      By purchasing this item, you're not only adding a unique piece to your collection but also
                      supporting local artisans and contributing to arts education in underserved communities.
                    </p>
                  </div>
                )}

                {activeTab === "care" && (
                  <div className="space-y-4">
                    <p>
                      To ensure the longevity of your {product.name.toLowerCase()}, please follow these care
                      instructions:
                    </p>
                    {product.category === "shirts" && (
                      <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        <li>Machine wash cold with similar colors</li>
                        <li>Use mild detergent</li>
                        <li>Tumble dry low or hang to dry</li>
                        <li>Iron on low heat if needed</li>
                        <li>Do not bleach</li>
                      </ul>
                    )}
                    {product.category === "jewelry" && (
                      <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        <li>Store in a cool, dry place</li>
                        <li>Clean with a soft polishing cloth</li>
                        <li>Avoid contact with perfumes and chemicals</li>
                        <li>Remove before swimming or showering</li>
                        <li>Have professionally cleaned once a year</li>
                      </ul>
                    )}
                    {product.category === "art" && (
                      <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        <li>Keep away from direct sunlight</li>
                        <li>Maintain in a room with stable humidity</li>
                        <li>Dust gently with a soft, dry cloth</li>
                        <li>Do not use cleaning products on the surface</li>
                        <li>Handle with clean, dry hands</li>
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Add to cart section */}
              <div className="pt-6 space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1">
                    <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                  </Button>
                </div>

                {/* Donation button */}
                <div className="relative">
                  <div className="absolute -top-6 right-0 text-xs text-primary animate-pulse">
                    ✨ Make a direct impact ✨
                  </div>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary/80 to-primary text-white hover:from-primary hover:to-primary/90"
                    asChild
                  >
                    <Link href="/donate" onClick={handleDonateClick}>
                      <HeartHandshake className="mr-2 h-5 w-5" /> Donate Directly to Our Cause
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Surprise twist - Interactive 3D-like effect hint */}
              <div className="bg-muted/50 rounded-lg p-4 border border-dashed border-primary/30">
                <h3 className="font-medium text-sm text-primary mb-2">The Surprise Twist</h3>
                <p className="text-sm text-muted-foreground">
                  Add this item to your cart to see a special animation effect! Our products don't just look good—they
                  come alive with interactive experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Related products */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((p) => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/feature/${relatedProduct.id}`}
                    className="group block rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="font-semibold">${relatedProduct.price.toFixed(2)}</div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

