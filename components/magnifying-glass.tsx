"use client"

import { useEffect, useRef, useState } from "react"

interface MagnifyingGlassProps {
  imageUrl: string
  magnification?: number
}

export default function MagnifyingGlass({ imageUrl, magnification = 2 }: MagnifyingGlassProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const glassRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const glass = glassRef.current

    if (!container || !glass) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()

      // Calculate cursor position relative to the container
      const x = e.clientX - left
      const y = e.clientY - top

      // Glass size
      const glassSize = glass.offsetWidth

      // Position the glass
      glass.style.left = `${x - glassSize / 2}px`
      glass.style.top = `${y - glassSize / 2}px`

      // Calculate background position
      const bgX = (x / width) * 100
      const bgY = (y / height) * 100

      // Set background position and size
      glass.style.backgroundImage = `url(${imageUrl})`
      glass.style.backgroundSize = `${width * magnification}px ${height * magnification}px`
      glass.style.backgroundPosition = `${bgX}% ${bgY}%`
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [imageUrl, magnification])

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 cursor-none"></div>
      <div ref={glassRef} className={`magnify-glass w-32 h-32 ${isVisible ? "opacity-100" : "opacity-0"}`}></div>
    </>
  )
}

