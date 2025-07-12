"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import gsap from "gsap"
import MagnifyingGlass from "@/components/magnifying-glass"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(products.find((p) => p.id === params.id))
  const [isLoaded, setIsLoaded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!product) {
      router.push("/products")
      return
    }

    setIsLoaded(true)

    // GSAP animations
    const tl = gsap.timeline()

    tl.from(imageRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(
      titleRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4",
    )

    tl.from(
      descRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4",
    )

    tl.from(
      priceRef.current,
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

    // Reset quantity
    setQuantity(1)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <main className="page-transition">
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" className="mb-8" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>

        <div className="l-composition">
          <div ref={imageRef} className="l-composition-main relative product-image-container">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-auto object-cover rounded-lg"
            />
            <MagnifyingGlass imageUrl={product.image} />
          </div>

          <div className="l-composition-sidebar">
            <h1 ref={titleRef} className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {product.name}
            </h1>
            <p ref={descRef} className="text-muted-foreground mb-8">
              {product.description}
            </p>

            <div ref={priceRef} className="mb-8">
              <div className="text-2xl font-bold mb-2">${product.price.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">
                10% of this purchase goes to supporting local arts education
              </div>
            </div>

            <div className="flex items-center mb-6">
              <span className="mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={incrementQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>

          <div className="l-composition-bottom mt-12">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{product.longDescription}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Features</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {product.features.map((feature, index) => (
                    <li key={index} className="mb-1">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

