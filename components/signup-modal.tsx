"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { gsap } from "gsap"

interface SignupModalProps {
  onClose: () => void
}

export default function SignupModal({ onClose }: SignupModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isHoveringButton, setIsHoveringButton] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "YOU'RE IN! 🎉",
        description: "Welcome to the UPTOWN VIBES family!",
      })
      onClose()

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
    }, 1500)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "WELCOME BACK! 🔥",
        description: "Ready to make a statement?",
      })
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div
        className="bg-[#1a0033] rounded-2xl max-w-md w-full shadow-[0_0_40px_rgba(153,51,255,0.4)] animate-in zoom-in-95 duration-300 border border-[#9933FF]/30 text-white"
        style={{ background: "linear-gradient(to bottom right, #1a0033, #330033)" }}
      >
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-black flex items-center">
            JOIN UPTOWN VIBES
            <Sparkles className="ml-2 h-5 w-5 text-[#FFFF66]" />
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="signup" className="p-6">
          <TabsList className="grid grid-cols-2 mb-8 bg-black/20">
            <TabsTrigger value="signup" className="data-[state=active]:bg-[#FF3366] data-[state=active]:text-white">
              SIGN UP
            </TabsTrigger>
            <TabsTrigger value="login" className="data-[state=active]:bg-[#FF3366] data-[state=active]:text-white">
              LOG IN
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-white/80">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    required
                    className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-white/80">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    required
                    className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#FF3366] hover:bg-[#FF3366]/90 text-white font-bold py-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,51,102,0.3)]"
                  disabled={isLoading}
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                      CREATING ACCOUNT...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      CREATE ACCOUNT <Zap className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-white/60">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </TabsContent>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-white/80">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  required
                  className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-white/80">
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  required
                  className="bg-white/10 border-white/20 focus:border-[#FF3366] text-white"
                />
              </div>

              <div className="text-right">
                <Button
                  variant="link"
                  className="text-[#33CCFF] p-0 h-auto"
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  Forgot password?
                </Button>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#FF3366] hover:bg-[#FF3366]/90 text-white font-bold py-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,51,102,0.3)]"
                  disabled={isLoading}
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                      LOGGING IN...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      LOG IN <Zap className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        <div className="p-6 pt-0 text-center">
          <p className="text-sm text-white/60">Join our community of bold individuals who refuse to blend in.</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-[#FF3366] flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-[#33CCFF] flex items-center justify-center">
          <Zap className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}

