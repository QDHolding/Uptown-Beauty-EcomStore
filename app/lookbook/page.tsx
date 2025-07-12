"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, Play, ShoppingBag, Volume2, VolumeX, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { TextPlugin } from "gsap/TextPlugin"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)
}

interface Collection {
  id: string
  title: string
  tagline: string
  description: string
  theme: string
  color: string
  textColor: string
  images: string[]
  video?: string
  products: {
    name: string
    price: number
    image: string
  }[]
}

const collections: Collection[] = [
  {
    id: "summer-2023",
    title: "Summer 2023",
    tagline: "Coastal Elegance",
    description: "Flowing silhouettes inspired by the serene beauty of coastal landscapes.",
    theme: "Coastal Breeze",
    color: "#03b5aa", // Bright Teal
    textColor: "#FFFFFF",
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2873&auto=format&fit=crop",
    ],
    video:
      "/public/Boutiquevid1.mp4",
    products: [
      {
        name: "Silk Wave Blouse",
        price: 189.99,
        image: "/public/photo1.jpg",
      },
      {
        name: "Ocean Pendant",
        price: 249.99,
        image: "/public/photo1.jpg",
      },
      {
        name: "Coastal Canvas",
        price: 399.99,
        image: "/public/photo1.jpg",
      },
    ],
  },
  {
    id: "autumn-2023",
    title: "Autumn 2023",
    tagline: "Urban Textures",
    description: "Earthy tones and rich textures that capture the essence of fall in the city.",
    theme: "Urban Harvest",
    color: "#049a8f", // Medium Teal
    textColor: "#FFFFFF",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2870&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2788&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=2786&auto=format&fit=crop",
    ],
    video:
      "/public/Boutiquevid1.mp4",
    products: [
      {
        name: "Textured Cashmere Wrap",
        price: 229.99,
        image: "/public/photo1.jpg",
      },
      {
        name: "Amber Statement Earrings",
        price: 179.99,
        image: "/public/photo1.jpg",
      },
      {
        name: "Urban Landscape Print",
        price: 349.99,
        image: "/public/photo1.jpg",
      },
    ],
  },
  {
    id: "winter-2024",
    title: "Winter 2024",
    tagline: "Refined Luxury",
    description: "Luxurious layers and bold accessories for the sophisticated woman.",
    theme: "Frosted Elegance",
    color: "#037971", // Deep Teal
    textColor: "#FFFFFF",
    images: [
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=2726&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2760&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop",
    ],
    video:
      "/public/Boutiquevid1.mp4",
    products: [
      {
        name: "Merino Wool Turtleneck",
        price: 259.99,
        image: "/public/photo1.jpg",
      },
      {
        name: "Sapphire Pendant Necklace",
        price: 329.99,
        image: "/public/photo1.jpg",
      },
      {
        name: "Winter Solstice Art Piece",
        price: 499.99,
        image: "/public/photo1.jpg",
      },
    ],
  },
  {
    id: "spring-2024",
    title: "Spring 2024",
    tagline: "Botanical Revival",
    description: "Fresh patterns and delicate jewelry inspired by blooming gardens and new beginnings.",
    theme: "Botanical Revival",
    color: "#00bfb3", // Teal
    textColor: "#FFFFFF",
    images: [
      "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=2564&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571908598047-29b1c0925bad?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2787&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=2787&auto=format&fit=crop",
    ],
    video: "/public/Boutiquevid1.mp4",
    products: [
      {
        name: "Floral Silk Kimono",
        price: 219.99,
        image: "/public/photo1.jpg",
      },
      {
        name: "Petal Drop Earrings",
        price: 159.99,
        image: "/public/photo1.jpg",
      },
      {
        name: "Botanical Watercolor Series",
        price: 379.99,
        image: "/public/photo1.jpg",
      },
    ],
  },
]

export default function LookbookPage() {
  const [isMuted, setIsMuted] = useState(true)
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)
  const [showQuickView, setShowQuickView] = useState<{ index: number; productIndex: number } | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorText, setCursorText] = useState("")
  const [isHoveringVideo, setIsHoveringVideo] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const cursorRef = useRef<HTMLDivElement>(null)

  // Track mouse position for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((t) => t.kill())

    // GSAP animations for page load
    const tl = gsap.timeline()

    // Animate the hero title with text reveal
    tl.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    })

    // Animate the tagline with a typewriter effect
    tl.to(
      ".hero-tagline",
      {
        duration: 2,
        text: {
          value: "Artistry in motion. Elegance in design.",
          delimiter: "",
        },
        ease: "none",
      },
      "-=0.8",
    )

    tl.from(
      ".hero-scroll",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6",
    )

    // Setup scroll animations
    if (typeof window !== "undefined") {
      // Hero parallax effect
      gsap.to(".hero-bg", {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Animate the scroll indicator
      gsap.to(".hero-scroll", {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "10% top",
          end: "20% top",
          scrub: true,
        },
      })

      // Floating animation for the cursor
      gsap.to(".custom-cursor", {
        y: -11,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Setup animations for each collection section
      collections.forEach((_, index) => {
        if (textRefs.current[index] && sectionRefs.current[index]) {
          // Heading animation with split text
          const headingElement = document.querySelector(`#collection-${index} .collection-title`)
          if (headingElement) {
            const chars = headingElement.textContent?.split("") || []
            headingElement.innerHTML = ""

            chars.forEach((char, i) => {
              const span = document.createElement("span")
              span.textContent = char
              span.style.display = "inline-block"
              span.style.opacity = "0"
              span.style.transform = "translateY(50px)"
              span.className = `char-${i}`
              headingElement.appendChild(span)
            })

            gsap.to(`#collection-${index} .collection-title span`, {
              opacity: 1,
              y: 0,
              stagger: 0.03,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: `#collection-${index}`,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            })
          }

          // Tagline animation
          gsap.from(`#collection-${index} .collection-tagline`, {
            y: 50,
            opacity: 0,
            scrollTrigger: {
              trigger: `#collection-${index}`,
              start: "top 70%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          })

          // Description animation
          gsap.from(`#collection-${index} .collection-description`, {
            y: 30,
            opacity: 0,
            scrollTrigger: {
              trigger: `#collection-${index}`,
              start: "top 60%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          })

          // Image animations with staggered reveal
          gsap.from(`#collection-${index} .collection-image`, {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            scrollTrigger: {
              trigger: `#collection-${index}`,
              start: "top 60%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          })

          // Product card animations
          gsap.from(`#collection-${index} .product-card`, {
            scale: 0.9,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            scrollTrigger: {
              trigger: `#collection-${index} .products-grid`,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          })

          // Surprise element animation
          if (index % 2 === 0) {
            gsap.from(`#collection-${index} .surprise-element`, {
              scale: 0,
              rotation: -180,
              opacity: 0,
              scrollTrigger: {
                trigger: `#collection-${index}`,
                start: "center center",
                toggleActions: "play none none reverse",
              },
            })
          } else {
            gsap.from(`#collection-${index} .surprise-element`, {
              x: -100,
              opacity: 0,
              scrollTrigger: {
                trigger: `#collection-${index}`,
                start: "center center",
                toggleActions: "play none none reverse",
              },
            })
          }
        }
      })

      // Parallax effect for the final section
      gsap.to(".final-bg", {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: ".final-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Text animations for final section
      gsap.from(".final-title", {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: ".final-section",
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      })

      gsap.from(".final-description", {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: ".final-section",
          start: "top 60%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      })

      gsap.from(".final-buttons", {
        y: 30,
        opacity: 0,
        scrollTrigger: {
          trigger: ".final-section",
          start: "top 50%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      })

      // Surprise video section
      gsap.from(".surprise-content", {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: ".surprise-section",
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      })

      // Random floating elements
      const floatingElements = document.querySelectorAll(".floating-element")
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -20 : 20,
          x: index % 3 === 0 ? 10 : -10,
          rotation: index % 2 === 0 ? 10 : -10,
          duration: 2 + (index % 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        })
      })
    }

    // Add loaded class for page transition
    const pageElement = document.querySelector(".page-transition")
    if (pageElement) {
      pageElement.classList.add("loaded")
    }

    return () => {
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isMuted
      }
    })
  }

  const playVideo = (index: number) => {
    setActiveVideoIndex(index)
    const video = videoRefs.current[index]
    if (video) {
      video.currentTime = 0
      video.play()
      video.muted = isMuted
    }
  }

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: sectionRefs.current[index],
          offsetY: 80,
        },
        ease: "power3.inOut",
      })
    }
  }

  const handleVideoHover = (isHovering: boolean) => {
    setIsHoveringVideo(isHovering)
    setCursorText(isHovering ? "Play" : "")
  }

  const openQuickView = (collectionIndex: number, productIndex: number) => {
    setShowQuickView({ index: collectionIndex, productIndex })
  }

  const closeQuickView = () => {
    setShowQuickView(null)
  }

  return (
    <main className="page-transition overflow-hidden">
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={cn(
          "custom-cursor fixed pointer-events-none z-50 transition-all duration-200 flex items-center justify-center",
          isHoveringVideo ? "w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm" : "w-0 h-0",
          cursorText ? "text-white text-sm font-medium" : "",
        )}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {isHoveringVideo && <Play className="h-8 w-8 text-white" />}
        {cursorText && <span>{cursorText}</span>}
      </div>

      <div ref={containerRef} className="relative">
        {/* Hero Section */}
        <section className="hero-section h-screen w-full flex items-center justify-center relative overflow-hidden">
          <div className="hero-bg absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src="https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-different-outfits-in-a-clothing-store-18275-large.mp4"
            />
          </div>

          <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="hero-title text-7xl md:text-9xl font-bold mb-6 tracking-tight">Lookbook</h1>
            <p className="hero-tagline text-xl md:text-3xl mb-12 font-light tracking-wide h-12">
              {/* Text will be filled by GSAP */}
            </p>
            <div className="hero-scroll animate-bounce flex flex-col items-center mt-16">
              <span className="text-sm uppercase tracking-widest mb-2">Scroll to explore</span>
              <ChevronDown className="h-6 w-6" />
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-[#00bfb3]/20 backdrop-blur-md floating-element"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-[#037971]/20 backdrop-blur-md floating-element"></div>
          <div className="absolute top-1/3 right-1/5 w-12 h-12 rounded-full bg-[#03b5aa]/20 backdrop-blur-md floating-element"></div>
        </section>

        {/* Collection Navigation */}
        <section className="bg-white py-6 sticky top-0 z-30 shadow-sm">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {collections.map((collection, index) => (
                <button
                  key={collection.id}
                  onClick={() => scrollToSection(index)}
                  className="px-4 py-2 text-sm md:text-base font-medium hover:text-[#00bfb3] transition-colors relative group"
                >
                  {collection.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00bfb3] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Collection Sections */}
        {collections.map((collection, index) => (
          <section
            id={`collection-${index}`}
            key={collection.id}
            ref={(el) => {
              if (el) sectionRefs.current[index] = el
            }}
            className="min-h-screen py-24 relative"
            style={{ backgroundColor: `${collection.color}05` }}
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div ref={(el) => {
                  if (el) textRefs.current[index] = el
                }} className="space-y-8">
                  <div className="space-y-4">
                    <h2
                      className="collection-title text-6xl md:text-8xl font-bold tracking-tight"
                      style={{ color: collection.color }}
                    >
                      {collection.title}
                    </h2>
                    <p
                      className="collection-tagline text-3xl md:text-5xl font-light"
                      style={{ color: collection.color }}
                    >
                      {collection.tagline}
                    </p>
                  </div>

                  <p className="collection-description text-xl md:text-2xl text-muted-foreground max-w-xl">
                    {collection.description}
                  </p>

                  <div className="pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="text-lg px-8 overflow-hidden group relative"
                      style={{
                        backgroundColor: collection.color,
                        color: collection.textColor,
                      }}
                    >
                      <Link href={`/products?collection=${collection.id}`} className="relative z-10">
                        Explore Collection
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="absolute inset-0 w-0 bg-black/20 transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  {collection.video ? (
                    <div
                      className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl collection-image"
                      onMouseEnter={() => handleVideoHover(true)}
                      onMouseLeave={() => handleVideoHover(false)}
                      onClick={() => playVideo(index)}
                    >
                      <video

                        ref={(el) => {
                          if (el) videoRefs.current[index] = el
                        }}
                        src={collection.video}
                        className="h-full w-full object-cover"
                        loop
                        muted={isMuted}
                        playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 rounded-full bg-black/30 text-white hover:bg-black/50 z-10"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleMute()
                        }}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  ) : (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl collection-image">
                      <Image
                        src={collection.images[0] || "/placeholder.svg"}
                        alt={collection.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {collection.images.slice(1, 4).map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative aspect-square rounded-xl overflow-hidden shadow-lg collection-image"
                        style={{
                          transform: `translateY(${imgIndex * 10}px)`,
                          zIndex: 10 - imgIndex,
                        }}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${collection.title} ${imgIndex + 2}`}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured Products */}
              <div className="mt-24">
                <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: collection.color }}>
                  Featured Pieces
                </h3>
                <div className="products-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                  {collection.products.map((product, productIndex) => (
                    <div
                      key={productIndex}
                      className="product-card group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 w-full">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full bg-white text-black hover:bg-white/90"
                              onClick={(e) => {
                                e.preventDefault()
                                openQuickView(index, productIndex)
                              }}
                            >
                              Quick View
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-lg">{product.name}</h4>
                        <p className="text-[#037971] font-semibold mt-1">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Surprise element - different for each collection */}
              <div className="mt-16 flex justify-center">
                {index % 2 === 0 ? (
                  <div
                    className="surprise-element relative w-32 h-32 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: collection.color }}
                  >
                    <span className="text-white font-bold text-lg">Limited Edition</span>
                    <div className="absolute inset-0 border-4 border-white rounded-full animate-ping opacity-70"></div>
                  </div>
                ) : (
                  <div
                    className="surprise-element py-4 px-8 border-2 border-dashed"
                    style={{ borderColor: collection.color }}
                  >
                    <p className="text-lg font-medium" style={{ color: collection.color }}>
                      Exclusive to Uptown LA
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

        ))}
        {/* Surprise Video Section */}
        <section className="surprise-section relative h-screen w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://assets.mixkit.co/videos/preview/mixkit-woman-trying-different-clothes-in-a-clothing-store-18276-large.mp4"
          />
          <div className="absolute inset-0 bg-[#023436]/70"></div>

          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="surprise-content text-center text-white max-w-3xl mx-auto px-6">
              <div className="mb-8 inline-block">
                <div className="w-24 h-24 rounded-full bg-[#00bfb3] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-10 w-10" />
                </div>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6">The Artisan's Touch</h2>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Every piece in our collection is thoughtfully designed and crafted with attention to detail. Our
                creative process combines traditional techniques with modern innovation.
              </p>
              <Button asChild size="lg" className="bg-white text-[#023436] hover:bg-white/90 text-lg px-8">
                <Link href="/about">Discover Our Story</Link>
              </Button>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-1/4 left-1/5 w-20 h-20 rounded-full bg-[#00bfb3]/20 backdrop-blur-md floating-element"></div>
          <div className="absolute bottom-1/3 right-1/5 w-32 h-32 rounded-full bg-[#037971]/20 backdrop-blur-md floating-element"></div>
        </section>

        {/* Final Section */}
        <section className="final-section relative h-screen w-full overflow-hidden">
          <div className="final-bg absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#023436]/80 to-[#023436]/60 z-10"></div>
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2760&auto=format&fit=crop"
              alt="Fashion background"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-20 h-full flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-6">
              <h2 className="final-title text-6xl md:text-8xl font-bold mb-8 tracking-tight">
                Find Your Signature Piece
              </h2>
              <p className="final-description text-xl md:text-3xl mb-12 max-w-3xl mx-auto font-light">
                Explore our full collection of designer shirts, personalized jewelry, and unique art pieces. Each item
                tells a story and supports our mission.
              </p>
              <div className="final-buttons flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#00bfb3] text-white hover:bg-[#00bfb3]/90 text-lg px-8 group relative overflow-hidden"
                >
                  <Link href="/products" className="relative z-10">
                    Shop All Products
                    <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/20 text-lg px-8"
                >
                  <Link href="/donate">Support Our Cause</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-[#00bfb3]/20 backdrop-blur-md floating-element"></div>
          <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-[#037971]/20 backdrop-blur-md floating-element"></div>
        </section>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto animate-in fade-in zoom-in-95 duration-300">
            <div className="relative">
              <Button variant="ghost" size="icon" className="absolute right-2 top-2 z-10" onClick={closeQuickView}>
                <X className="h-5 w-5" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={
                      collections[showQuickView.index].products[showQuickView.productIndex].image || "/placeholder.svg"
                    }
                    alt={collections[showQuickView.index].products[showQuickView.productIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold mb-2">
                    {collections[showQuickView.index].products[showQuickView.productIndex].name}
                  </h3>
                  <p className="text-[#037971] text-xl font-semibold mb-4">
                    ${collections[showQuickView.index].products[showQuickView.productIndex].price.toFixed(2)}
                  </p>

                  <div className="mt-4 mb-6">
                    <p className="text-muted-foreground">
                      This exquisite piece from our {collections[showQuickView.index].title} collection embodies the
                      essence of {collections[showQuickView.index].theme.toLowerCase()}. Crafted with premium materials
                      and attention to detail.
                    </p>
                  </div>

                  <div className="mt-auto space-y-4">
                    <Button className="w-full" style={{ backgroundColor: collections[showQuickView.index].color }}>
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Full Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

