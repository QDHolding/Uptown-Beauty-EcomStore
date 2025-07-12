import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/lib/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Uptown LA Boutique",
  description:
    "Designer shirts, personalized jewelry, and unique art pieces with 10% of sales going to non-profit organizations",
    icons: {
      icon: "/luxiourious logo for -UVI-.png",
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen flex flex-col")}>
        <CartProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}



import './globals.css'