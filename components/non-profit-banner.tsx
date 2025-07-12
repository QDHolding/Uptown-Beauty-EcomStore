"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

export default function NonProfitBanner() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className={cn(
        "inline-flex items-center bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 transition-all duration-300",
        isHovering ? "bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105" : "",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-300",
          isHovering ? "bg-[#FF3366] text-white" : "bg-white/10 text-white/70",
        )}
      >
        <Heart className={cn("h-4 w-4 transition-all duration-300", isHovering ? "fill-white" : "")} />
      </div>
      <div className="text-sm font-bold">10% OF SALES DONATED TO SUPPORT LOCAL ARTS EDUCATION</div>
    </div>
  )
}

