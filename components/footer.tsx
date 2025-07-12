import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Uptown LA</h3>
            <p className="text-muted-foreground">
              Designer shirts, personalized jewelry, and unique art pieces with 10% of sales going to non-profit
              organizations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=shirts"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Designer Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=jewelry"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Personalized Jewelry
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=art"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Art Pieces
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="text-muted-foreground hover:text-primary transition-colors">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="/about#non-profit" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Non-Profit Work
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-muted-foreground hover:text-primary transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-muted-foreground">Sign up for our newsletter to receive updates and exclusive offers.</p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Uptown LA Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

